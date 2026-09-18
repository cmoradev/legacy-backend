import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { S3Service } from '../../../common/storage/s3.service';
import { MAIL_TEMPLATES, MailService } from '../../../common/mail';

@Injectable()
export class AcademyChargeInvoiceService extends TypeOrmCrudService<
  AcademyChargeInvoice
> {
  constructor(
    @InjectRepository(AcademyChargeInvoice, ColegioDBNameConnection)
    readonly repo: Repository<AcademyChargeInvoice>,
    private readonly s3Service: S3Service,
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
    const folder = 'comprobantes/academias';
    const xmlBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toLowerCase()}.xml`,
    );
    const pdfBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toLowerCase()}.pdf`,
    );

    return this.mailService.sendEmail({
      to: email,
      subject: 'Comprobantes de pago CFDI',
      template: MAIL_TEMPLATES.CFDI_ISSUED_NOTIFICATION,
      context: {
        greeting: 'Gracias por su pago',
        description:
          'Adjuntos, le enviamos su factura electrónica y archivo XML',
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
      ],
    });
  }

  async sendMailCancelacion(
    uuid: string,
    email: string,
    subject: string,
    body: string,
  ) {
    const folder = 'comprobantes/academias';
    const xmlBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toLowerCase()}.xml`,
    );
    const pdfBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toLowerCase()}.pdf`,
    );
    const acuseBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toUpperCase()}-acuse.xml`,
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
