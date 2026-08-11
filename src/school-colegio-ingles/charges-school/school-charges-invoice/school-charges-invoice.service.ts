import {Injectable, NotFoundException} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { InvoiceProcessorCollege } from './utils/invoice.processor';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { ConfigService } from '../../../common/config/config.service';
import { S3Service } from '../../../common/storage/s3.service';
import * as moment from 'moment';

@Injectable()
export class SchoolChargesInvoiceService extends TypeOrmCrudService<SchoolChargesInvoice> {
  constructor(
    @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
      readonly repo: Repository<SchoolChargesInvoice>,
    readonly serviceInvoiceCompany: BranchOfficeSettingService,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
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

  async sendMail(currentBranch: BranchOffice, uuid: string, email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: currentBranch.Email,
        pass: currentBranch.EmailPass,
      },
    });
    const folder = 'comprobantes/colegio';
    const xmlBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}.xml`);
    const pdfBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}.pdf`);
    const mailOptions: Mail.Options = {
      to: email,
      from: currentBranch.Email,
      subject: 'Comprobantes de pago CFDI',
      text: 'CFDI',
      html: '<div> <h2>Gracias por su pago</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br></div>',
      attachments: [
        {
          filename: uuid.toUpperCase() + '.xml',
          content: xmlBuffer,
        },
        {
          filename: uuid.toUpperCase() + '.pdf',
          content: pdfBuffer,
        },
      ],
    };
    return await transporter.sendMail(mailOptions);

  }

  async sendMailCancelacion(currentBranch: BranchOffice, uuid: string, email: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: currentBranch.Email,
        pass: currentBranch.EmailPass,
      },
    });
    const folder = 'comprobantes/colegio';
    const xmlBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}.xml`);
    const pdfBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}.pdf`);
    const acuseBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}-acuse.xml`);
    const mailOptions: Mail.Options = {
      to: email,
      from: currentBranch.Email,
      subject, // 'Tienda - Solicitud de cancelación del Comprobantes de pago CFDI',
      html: `<div>
                    <h2>Notificación de cancelación de CFDI</h2><br>
                    <h4>Motivo de cancelación: </h4>
                     <p>${body}</p>
                    <p>Adjuntos, le enviamos la factura electrónica y archivo XML que ha sido enviados a su buzón tributario para cancelación.</p>
                    <p>Desde su buzón podrá autorizar o declinar la cancelación del CFDI, cuenta con 72 horas, 
                     transcurrido ese lapso de tiempo se tomará como positivo y se procederá con la cancelación.</p>
                     <p>En caso de ser cancelable sin autorizacion se le adjuntara el acuse de cancelación.</p>
                    <br> 
                    </div>`,
      attachments: [
        {
          filename: uuid.toUpperCase() + '.xml',
          content: xmlBuffer,
        },
        {
          filename: uuid.toUpperCase() + '.pdf',
          content: pdfBuffer,
        },
        {
          filename: `${uuid.toUpperCase()}-acuse.xml`,
          content: acuseBuffer,
        },
      ],
    };
    return await transporter.sendMail(mailOptions);
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
