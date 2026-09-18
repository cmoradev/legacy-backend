import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  FormaPagoEnum,
  MetodoPagoEnum,
  TipoComprobanteEnum,
} from '@munyaal/cfdi';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
import { ConfigService } from '../common/config/config.service';
import { ComprobanteDownloadService } from '../common/storage/comprobante-download.service';
import { MAIL_TEMPLATES, MailService } from '../common/mail';

export interface ConceptWithTaxes {
  ClaveProdServ: string;
  NoIdentificacion: string;
  Cantidad: number | string;
  ClaveUnidad: string;
  Unidad?: string;
  Descripcion: string;
  ValorUnitario: number | string;
  Importe: number | string;
  Descuento: number | string;
  impuestosTransladados?: {
    Base?: string;
    Impuesto: string;
    TipoFactor: string;
    TasaOCuota: string;
    Importe: string;
  };
  impuestosRetenidos?: {
    Base?: string;
    Impuesto: string;
    TipoFactor: string;
    TasaOCuota: string;
    Importe: string;
  };
}

export interface InvoiceSat {
  Version?: string;
  Serie: string;
  Folio: string;
  Fecha: string;
  Sello: string;
  FormaPago: FormaPagoEnum;
  NoCertificado: string;
  Certificado: string;
  s;
  condicionesDePago?: string;
  SubTotal: string;
  Descuento: string;
  Moneda: string;
  Total: string;
  TipoDeComprobante: TipoComprobanteEnum;
  MetodoPago: MetodoPagoEnum;
  LugarExpedicion: string;
  Impuesto: string;
  TasaOCuota: string;
  TipoFactor: string;
}

@Injectable()
export class CreditNoteAcademyService extends TypeOrmCrudService<
  CreditNoteAcademy
> {
  constructor(
    @InjectRepository(CreditNoteAcademy, ColegioDBNameConnection)
    readonly repo: Repository<CreditNoteAcademy>,
    @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection)
    readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
    private readonly configService: ConfigService,
    private readonly comprobanteDownloadService: ComprobanteDownloadService,
    private readonly mailService: MailService,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({ id }, { withDeleted: true });
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.restore(id);
  }

  async saveCreditNote(creditNote: Partial<CreditNoteAcademy>) {
    return await this.repo.save(creditNote);
  }

  async branchOfficeSetting(
    branchOfficeId: string | number,
    branchOfficeModuleId: string | number,
  ) {
    const settingsBranchOffice = await this.branchOfficeSettingRepository
      .createQueryBuilder('setting')
      .leftJoin('setting.invoiceCampus', 'branchOffice')
      .where('branchOffice.id = :branchOfficeId', {
        branchOfficeId: branchOfficeId,
      })
      .andWhere('setting.id = :settingsId', {
        settingsId: branchOfficeModuleId,
      })
      .getOne();
    return settingsBranchOffice;
  }

  async getLastFolio() {
    return await this.repo
      .createQueryBuilder('creditNote')
      .select('COALESCE(MAX(id), 0) + 1', 'last')
      .getRawOne();
  }

  async sendMailCancelacion(
    uuid: string,
    email: string,
    subject: string,
    body: string,
  ) {
    const folder = 'notas-credito';
    const xmlBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      folder,
      uuid,
      '.xml',
    );
    const pdfBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      folder,
      uuid,
      '.pdf',
    );
    const acuseBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      folder,
      uuid,
      '-acuse.xml',
    );

    return this.mailService.sendEmail({
      to: email,
      subject,
      template: MAIL_TEMPLATES.CFDI_CANCELLATION_NOTIFICATION,
      context: {
        title: 'Notificación de cancelación de CFDI',
        reasonLabel: 'Motivo de cancelación',
        reason: body,
        description:
          'Adjuntos, le enviamos la factura electrónica y archivo XML que ha sido enviados a su buzón tributario para cancelación.',
        deadlineNotice:
          'Desde su buzón podrá autorizar o declinar la cancelación del CFDI, cuenta con 72 horas, transcurrido ese lapso de tiempo se tomará como positivo y se procederá con la cancelación.',
        acuseNotice:
          'En caso de ser cancelable sin autorización se le adjuntará el acuse de cancelación.',
      },
      attachments: [
        {
          filename: uuid.toUpperCase() + '.xml',
          contentType: 'application/xml',
          content: xmlBuffer,
        },
        {
          filename: uuid.toUpperCase() + '.pdf',
          contentType: 'application/pdf',
          content: pdfBuffer,
        },
        {
          filename: `${uuid.toUpperCase()}-acuse.xml`,
          contentType: 'application/xml',
          content: acuseBuffer,
        },
      ],
    });
  }
}
