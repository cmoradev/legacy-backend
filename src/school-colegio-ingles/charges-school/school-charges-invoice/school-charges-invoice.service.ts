import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { AcademyChargeInvoice } from '../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class SchoolChargesInvoiceService extends TypeOrmCrudService<SchoolChargesInvoice> {
  constructor(
    @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
      repo: Repository<SchoolChargesInvoice>,
  ) {
    super(repo);
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
    const pathInvoice = '/var/www/pdc/comprobantes/colegio/' + uuid.toUpperCase();
    const mailOptions: Mail.Options = {
      to: email,
      from: currentBranch.Email,
      subject: 'Academias - Comprobantes de pago CFDI',
      text: 'CFDI',
      html: '<div> <h2>Gracias por su pago</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br><p>Academias del Colegio Inglés</p></div>',
      attachments: [
        {
          filename: uuid.toUpperCase() + '.xml',
          path: `${pathInvoice}.xml`,
        },
        {
          filename: uuid.toUpperCase() + '.pdf',
          path: `${pathInvoice}.pdf`,
        },
      ],
    };
    return await transporter.sendMail(mailOptions);

  }
}
