import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, Raw } from 'typeorm';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import * as MomentTimeZone from 'moment-timezone';
import * as moment from 'moment';
import { ChangeStatusInvoiceMiniStoreInterface } from './interface/ChangeStatusInvoiceMiniStore.interface';
import { UsersService } from '../../../system/users/users.service';
import { InvoiceProcessor } from './processor/invoice.processor';
import { ReportInvoice } from './reports/invoice.report';
import { InvoiceReport } from '../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { ConfigService } from '../../../common/config/config.service';
import { ComprobanteDownloadService } from '../../../common/storage/comprobante-download.service';
import { MAIL_TEMPLATES, MailService } from '../../../common/mail';

@Injectable()
export class MiniStoreInvoicesService extends TypeOrmCrudService<
  MiniStoreInvoice
> {
  constructor(
    @InjectRepository(MiniStoreInvoice, ColegioDBNameConnection)
    readonly repo: Repository<MiniStoreInvoice>,
    readonly salesPaymentService: MiniStoreSalesPaymentsService,
    readonly userService: UsersService,
    readonly serviceInvoiceCompany: BranchOfficeSettingService,
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

  async updateInvoice(data: MiniStoreInvoice) {
    let invoice = await this.repo.findOne({ id: data.id });
    invoice = { ...data };
    return await this.repo.save(invoice);
  }

  async changeStautsInvoice(data: ChangeStatusInvoiceMiniStoreInterface) {
    const fecha = MomentTimeZone()
      .tz('America/Mexico_City')
      .format('YYYY-MM-DDTHH:mm:ss');
    const invoice = await this.repo.findOne({ id: data.id });
    invoice.status = data.status;
    invoice.idCancelingAgent = data.idCancelingAgent;
    invoice.agentCanceling = await this.userService.findOne({
      id: data.idCancelingAgent,
    });
    invoice.reasonCancellation = data.reasonCancellation;
    // @ts-ignore
    invoice.cancellationDate = fecha;
    return await this.repo.save(invoice);
  }

  async changeStautsInvoiceC(id: number, status: number) {
    const invoice = await this.repo.findOne({ id });
    invoice.status = status;
    return await this.repo.save(invoice);
  }

  async changeStautsPayment(id: number, status: number) {
    const payment = await this.salesPaymentService.findOne({ id });
    payment.stamping = status;
    return await this.salesPaymentService.repo.save(payment);
  }

  async saveInvoice(data: MiniStoreInvoice) {
    const invoice = await this.repo.create(data);
    const result = await this.repo.save(invoice);
    return await this.repo.findOne({ id: result.id });
  }

  async findInvoiceByPayment(options: {
    paymentId: number;
    status: StatusInvoce;
    stamping?: number;
  }) {
    const invoice = this.repo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.miniStoreSalePayment', 'miniStoreSalePayment')
      // .leftJoinAndSelect('miniStoreSalePayment.miniStoreSaleMethodPayments', 'miniStoreSaleMethodPayments')
      .where('invoice.status = :status', {
        status: options.status,
      })
      .where('miniStoreSalePayment.id= :paymentId', {
        paymentId: options.paymentId,
      });
    if (options.stamping) {
      invoice.andWhere('miniStoreSalePayment.stamping= :stamping', {
        stamping: options.stamping,
      });
    }

    return await invoice.getOne();
  }

  async sendMail(uuid: string, email: string) {
    const xmlBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      'tienda',
      uuid,
      '.xml',
    );
    const pdfBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      'tienda',
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
    const folder = 'tienda';
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

  // eliminar al cambiar los reporte del front

  async reportInvoice(query: {
    startDate: string;
    endDate: string;
    billingAgent: string;
    status: string;
    data: string;
  }): Promise<string | InvoiceReport[] | any> {
    const invoices = await this.repo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.agentBilling', 'agentBilling')
      .leftJoinAndSelect('invoice.agentCanceling', 'agentCanceling')
      .leftJoinAndSelect('invoice.miniStoreSalePayment', 'miniStoreSalePayment')
      .leftJoinAndSelect(
        'miniStoreSalePayment.miniStoreSaleMethodPayments',
        'miniStoreSaleMethodPayments',
      )
      .leftJoinAndSelect(
        'miniStoreSaleMethodPayments.invoiceMethod',
        'invoiceMethod',
      )
      .leftJoinAndSelect('invoice.miniStoreSale', 'miniStoreSale')
      .leftJoinAndSelect('miniStoreSale.student', 'student')
      .leftJoinAndSelect('invoice.saleReturn', 'saleReturn')
      .leftJoinAndSelect('saleReturn.agent', 'agent')
      .leftJoinAndSelect('saleReturn.paymentMethod', 'paymentMethod')
      .where('invoice.createdAt Between :startDate and :endDate', {
        startDate: query.startDate,
        endDate: query.endDate,
      })
      .getMany();

    const report = new InvoiceProcessor().structureInvoiceReport(invoices);
    switch (query.data) {
      case 'data':
        return report;
      case 'file':
        // TODO convertir dinamico
        const company = await this.serviceInvoiceCompany.findCompany(3);
        const workbook = new ReportInvoice().generateReport(
          report,
          query,
          company,
        );
        const dateName = new Date();
        const fileName = dateName.toTimeString() + '.xlsx';
        const result = await workbook.xlsx.writeBuffer({ filename: fileName });
        // await workbook.xlsx.writeFile('./xls-imports/' + fileName);
        const buffer = Buffer.from(result);
        const b64Encoding =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        return {
          src: b64Encoding + buffer.toString('base64'),
        };
        break;
    }
  }
}
