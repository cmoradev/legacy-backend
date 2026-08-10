import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as AdmZip from 'adm-zip';
import { S3Service } from './s3.service';
import { NotInvoiced } from '../interface/not-invoiced.interface';

@Injectable()
export class ComprobanteDownloadService {
  private readonly logger = new Logger(ComprobanteDownloadService.name);

  constructor(private readonly s3Service: S3Service) {}

  async downloadFile(
    folder: string,
    uuid: string,
    ext: 'pdf' | 'xml',
  ): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    const lowerUuid = uuid.toLowerCase();
    const key = `comprobantes/${folder}/${lowerUuid}.${ext}`;
    const contentType =
      ext === 'pdf' ? 'application/pdf' : 'application/xml';
    try {
      const buffer = await this.s3Service.getObjectCommand(key);
      return { buffer, contentType, filename: `${lowerUuid}.${ext}` };
    } catch (error) {
      if (error?.name === 'NoSuchKey' || error?.Code === 'NoSuchKey') {
        throw new NotFoundException(
          `No se encontró el ${ext.toUpperCase()} para el UUID ${lowerUuid}`,
        );
      }
      throw error;
    }
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
    res.set('Content-Type', contentType);
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  }

  sendZip(res: Response, buffer: Buffer): void {
    const downloadName = `${Date.now()}.zip`;
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', buffer.length.toString());
    res.send(buffer);
  }
}