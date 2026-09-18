import {Injectable, NotFoundException} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { InvoiceProcessorCollege } from './utils/invoice.processor';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { S3Service } from '../../../common/storage/s3.service';
import * as moment from 'moment';
import { MAIL_TEMPLATES, MailService } from '../../../common/mail';

@Injectable()
export class SchoolChargesInvoiceService extends TypeOrmCrudService<SchoolChargesInvoice> {
  constructor(
    @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
      readonly repo: Repository<SchoolChargesInvoice>,
    readonly serviceInvoiceCompany: BranchOfficeSettingService,
    private readonly s3Service: S3Service,
    private readonly mailService: MailService,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({id}, {withDeleted: true});
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.restore(id);
  }

  async findInvoiceByPayment(options: { paymentId: number, status: StatusInvoce, stamping?: number }) {
    const invoice = this.repo.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.schoolChargePayment', 'schoolChargePayment')
      .where('invoice.status = :status', {
        status: options.status,
      })
      .where('schoolChargePayment.id= :paymentId', {
        paymentId: options.paymentId,
      });
    if (options.stamping) {
      invoice.andWhere('schoolChargePayment.stamping= :stamping', {
        stamping: options.stamping,
      });
    }

    return await invoice.getOne();
  }

  async updateInvoice(data: SchoolChargesInvoice) {
    let invoice = await this.repo.findOne({ id: data.id });
    invoice = { ...data };
    return await this.repo.save(invoice);
  }

  async saveInvoice(data: SchoolChargesInvoice) {
    const invoice = await this.repo.create(data);
    const result = await this.repo.save(invoice);
    return await this.repo.findOne({ id: result.id });
  }

  async sendMail(uuid: string, email: string) {
    const folder = 'comprobantes/colegio';
    const xmlBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toLowerCase()}.xml`);
    const pdfBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toLowerCase()}.pdf`);

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

  async sendMailCancelacion(uuid: string, email: string, subject: string, body: string) {
    const folder = 'comprobantes/colegio';
    const xmlBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toLowerCase()}.xml`);
    const pdfBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toLowerCase()}.pdf`);
    const acuseBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}-acuse.xml`);

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

  async reportInvoices(query: {
    startDate: string;
    endDate: string;
    billingAgent: number;
    status: number;
    data: string,
    branchOfficeId: number,
    branchOfficeSettingId: number;
    onlyData: boolean
  }) {

    const invoices = this.repo.createQueryBuilder('invoices');
    invoices.leftJoinAndSelect('invoices.agentBilling', 'agentBilling');
    invoices.leftJoinAndSelect('invoices.agentCanceling', 'agentCanceling');
    invoices.leftJoinAndSelect('invoices.schoolChargePayment', 'schoolChargePayment');
    invoices.leftJoinAndSelect('schoolChargePayment.methodsPayments', 'methodsPayments');
    invoices.leftJoinAndSelect('methodsPayments.invoiceMethodPayment', 'invoiceMethodPayment');
    invoices.leftJoinAndSelect('invoices.schoolCharge', 'schoolCharge');
    invoices.leftJoinAndSelect('schoolCharge.schoolStudent', 'schoolStudent');
    invoices.andWhere('invoices.createdAt BETWEEN :startDate AND :endDate',
      {
        startDate: moment(query.startDate).startOf('day').toDate(),
        endDate: moment(query.endDate).endOf('day').toDate(),
      });

    if (query.status !== 0) {
      invoices.andWhere('invoices.status = :status', {
        status: query.status,
      });
    }

    const report = new InvoiceProcessorCollege().structureInvoiceReport(await invoices.getMany());
    return report;
  }
}
