import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { ComprobanteDownloadService } from '../../../common/storage/comprobante-download.service';
import { MAIL_TEMPLATES, MailService } from '../../../common/mail';

@Injectable()
export class AcademyChargeInvoiceService extends TypeOrmCrudService<
  AcademyChargeInvoice
> {
  constructor(
    @InjectRepository(AcademyChargeInvoice, ColegioDBNameConnection)
    readonly repo: Repository<AcademyChargeInvoice>,
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

  async findInvoiceByPayment(options: {
    paymentId: number;
    status: StatusInvoce;
    stamping?: number;
  }) {
    const invoice = this.repo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.academyChargePayment', 'academyChargePayment')
      .where('invoice.status = :status', {
        status: options.status,
      })
      .where('academyChargePayment.id= :paymentId', {
        paymentId: options.paymentId,
      });
    if (options.stamping) {
      invoice.andWhere('academyChargePayment.stamping= :stamping', {
        stamping: options.stamping,
      });
    }

    return await invoice.getOne();
  }

  async saveInvoice(data: AcademyChargeInvoice) {
    const invoice = await this.repo.create(data);
    const result = await this.repo.save(invoice);
    return await this.repo.findOne({ id: result.id });
  }

  async updateInvoice(data: AcademyChargeInvoice) {
    let invoice = await this.repo.findOne({ id: data.id });
    invoice = { ...data };
    return await this.repo.save(invoice);
  }

  async sendMail(uuid: string, email: string) {
    const folder = 'academias';
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

    return this.mailService.sendEmail({
      to: email,
      subject: 'Factura electrónica CFDI',
      template: MAIL_TEMPLATES.CFDI_ISSUED,
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
      ],
    });
  }

  async sendMailCancelacion(uuid: string, email: string) {
    const folder = 'academias';
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
      subject: 'Notificación de cancelación de CFDI',
      template: MAIL_TEMPLATES.CFDI_CANCELLATION,
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
