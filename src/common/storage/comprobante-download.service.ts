import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import * as AdmZip from 'adm-zip';
import { CfdiPdf } from '@munyaal/cfdi-pdf';
import { S3Service } from './s3.service';
import { FactSw } from '../../webService/FactSw';
import { NotInvoiced } from '../interface/not-invoiced.interface';

export interface DownloadOptions {
  regenerate?: boolean;
  cadenaOriginal?: string;
}

export interface DownloadErrorResponse {
  status: 'error';
  code: string;
  canRegenerate: boolean;
  message: string;
  data?: any;
}

@Injectable()
export class ComprobanteDownloadService {
  private readonly logger = new Logger(ComprobanteDownloadService.name);

  constructor(
    private readonly s3Service: S3Service,
    private readonly factSw: FactSw,
  ) {}

  async downloadFile(
    folder: string,
    uuid: string,
    ext: 'pdf' | 'xml',
    options?: DownloadOptions,
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    const lowerUuid = uuid;
    const key = `comprobantes/${folder}/${lowerUuid}.${ext}`;
    const contentType =
      ext === 'pdf' ? 'application/pdf' : 'application/xml';
    try {
      const buffer = await this.s3Service.getObjectCommand(key);
      return { buffer, contentType, filename: `${lowerUuid}.${ext}` };
    } catch (error) {
      if (error?.name !== 'NoSuchKey' && error?.Code !== 'NoSuchKey') {
        throw error;
      }
      
      if (!options?.regenerate) {
        return this.handleMissingOnFirstRequest(lowerUuid, ext);
      }


      return this.regenerateFile(
        folder,
        lowerUuid,
        ext,
        contentType,
        options.cadenaOriginal,
      );
    }
  }

  private async handleMissingOnFirstRequest(
    uuid: string,
    ext: 'pdf' | 'xml',
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    try {
      const validated = await this.factSw.getXmlByUuidValidated(uuid);

      const errRes: DownloadErrorResponse = {
        status: 'error',
        code: 'CFDI_STAMPED_FILE_MISSING',
        canRegenerate: true,
        message: `El comprobante ${uuid} está timbrado pero no se encontró el archivo ${ext.toUpperCase()}. ¿Deseas regenerarlo?`,
        data: {
          uuid: validated.uuid,
          statusSat: validated.statusSat,
          cadenaOriginalSAT: validated.cadenaOriginalSAT,
        },
      };
      throw new HttpException(errRes, HttpStatus.NOT_FOUND);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.warn(`UUID no encontrado en el servicio de timbrado: ${uuid}`, error);

      const errRes: DownloadErrorResponse = {
        status: 'error',
        code: 'CFDI_NOT_STAMPED',
        canRegenerate: false,
        message:
          'No se encontró el comprobante timbrado para el UUID. Contacta al equipo de soporte y desarrollo. O intente más tarde.',
        data: { uuid },
      };
      throw new HttpException(errRes, HttpStatus.NOT_FOUND);
    }
  }

  private async regenerateFile(
    folder: string,
    uuid: string,
    ext: 'pdf' | 'xml',
    contentType: string,
    cadenaOriginal?: string,
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    try {
      if (ext === 'xml') {
        return await this.regenerateXml(folder, uuid, contentType, cadenaOriginal);
      }
      return await this.regeneratePdf(folder, uuid, contentType, cadenaOriginal);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.warn(`Error al regenerar ${ext.toUpperCase()} para el UUID ${uuid}`, error);

      const errRes: DownloadErrorResponse = {
        status: 'error',
        code: 'CFDI_REGENERATE_ERROR',
        canRegenerate: false,
        message:
          'No se pudo regenerar el archivo. Contacta al equipo de soporte y desarrollo. O intente más tarde.',
        data: { uuid },
      };
      throw new HttpException(errRes, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async regenerateXml(
    folder: string,
    uuid: string,
    contentType: string,
    cadenaOriginal?: string,
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    const stamped = await this.factSw.getXmlByUuid(uuid);
    const xmlBuffer = Buffer.from(stamped.xml, 'utf-8');

    let pdfBuffer: Buffer | null = null;
    try {
      const cadena =
        cadenaOriginal ||
        (await this.factSw.validateCfdi(stamped.xml)).cadenaOriginalSAT;
      pdfBuffer = await this.generatePdf(stamped.xml, cadena);
    } catch (error) {
      this.logger.warn(
        `No se pudo generar el PDF para el UUID ${uuid}, se omite: ${error.message}`,
      );
    }

    await this.cacheStampedFiles(folder, uuid, xmlBuffer, pdfBuffer);

    return { buffer: xmlBuffer, contentType, filename: `${uuid}.xml` };
  }

  private async regeneratePdf(
    folder: string,
    uuid: string,
    contentType: string,
    cadenaOriginal?: string,
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    const xmlKey = `comprobantes/${folder}/${uuid}.xml`;
    let xml: string;
    let xmlFromS3 = true;

    try {
      const xmlBuffer = await this.s3Service.getObjectCommand(xmlKey);
      xml = xmlBuffer.toString('utf-8');
    } catch (error) {
      if (error?.name !== 'NoSuchKey' && error?.Code !== 'NoSuchKey') {
        throw error;
      }
      xmlFromS3 = false;
      const stamped = await this.factSw.getXmlByUuid(uuid);
      xml = stamped.xml;
    }

    const cadena =
      cadenaOriginal || (await this.factSw.validateCfdi(xml)).cadenaOriginalSAT;
    const pdfBuffer = await this.generatePdf(xml, cadena);

    const uploads: Promise<any>[] = [
      this.s3Service.putObjectCommand({
        type: 'application/pdf',
        buffer: pdfBuffer,
        key: `comprobantes/${folder}/${uuid}.pdf`,
      }),
    ];

    if (!xmlFromS3) {
      uploads.push(
        this.s3Service.putObjectCommand({
          type: 'application/xml',
          buffer: Buffer.from(xml, 'utf-8'),
          key: `comprobantes/${folder}/${uuid}.xml`,
        }),
      );
    }

    await Promise.all(uploads);

    return { buffer: pdfBuffer, contentType, filename: `${uuid}.pdf` };
  }

  private async generatePdf(xml: string, cadenaOriginal: string): Promise<Buffer> {
    const pdf = new CfdiPdf(xml, cadenaOriginal);
    return pdf.getBuffer();
  }

  private async cacheStampedFiles(
    folder: string,
    uuid: string,
    xmlBuffer: Buffer,
    pdfBuffer: Buffer | null,
  ): Promise<void> {
    const uploads: Promise<any>[] = [
      this.s3Service.putObjectCommand({
        type: 'application/xml',
        buffer: xmlBuffer,
        key: `comprobantes/${folder}/${uuid}.xml`,
      }),
    ];

    if (pdfBuffer) {
      uploads.push(
        this.s3Service.putObjectCommand({
          type: 'application/pdf',
          buffer: pdfBuffer,
          key: `comprobantes/${folder}/${uuid}.pdf`,
        }),
      );
    }

    await Promise.all(uploads);
  }

  private async settle<T>(
    promise: Promise<T>,
  ): Promise<
    { status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }
  > {
    try {
      const value = await promise;
      return { status: 'fulfilled', value };
    } catch (reason) {
      return { status: 'rejected', reason };
    }
  }

  async createZip(folder: string, items: NotInvoiced[]): Promise<Buffer> {
    const zip = new AdmZip();
    const skippedFiles: string[] = [];

    for (const i of items) {
      const uuid = (i.f_uuid != null ? i.f_uuid : i.p_global_uuid).toLowerCase();
      const pdfKey = `comprobantes/${folder}/${uuid}.pdf`;
      const xmlKey = `comprobantes/${folder}/${uuid}.xml`;

      const results = await Promise.all([
        this.settle(this.s3Service.getObjectCommand(pdfKey)),
        this.settle(this.s3Service.getObjectCommand(xmlKey)),
      ]);

      if (results[0].status === 'fulfilled') {
        zip.addFile(`${uuid}.pdf`, results[0].value);
      } else {
        this.logger.warn(`Archivo no encontrado en S3: ${pdfKey}`);
        skippedFiles.push(pdfKey);
      }

      if (results[1].status === 'fulfilled') {
        zip.addFile(`${uuid}.xml`, results[1].value);
      } else {
        this.logger.warn(`Archivo no encontrado en S3: ${xmlKey}`);
        skippedFiles.push(xmlKey);
      }
    }

    if (skippedFiles.length > 0) {
      this.logger.warn(
        `Se omitieron ${skippedFiles.length} archivo(s) del ZIP por no encontrarse en S3: ${skippedFiles.join(', ')}`,
      );
    }

    return zip.toBuffer();
  }

  sendFile(
    res: Response,
    buffer: Buffer,
    contentType: string,
    filename: string,
  ): void {
    const body = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    res.set('Content-Type', contentType);
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    res.set('Content-Length', body.length.toString());
    res.end(body);
  }

  sendZip(res: Response, buffer: Buffer): void {
    const body = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const downloadName = `${Date.now()}.zip`;
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', body.length.toString());
    res.end(body);
  }
}
