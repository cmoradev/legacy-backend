import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class AcademyChargeInvoiceService extends TypeOrmCrudService<AcademyChargeInvoice> {
    constructor(
      @InjectRepository(AcademyChargeInvoice, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeInvoice>,
      private readonly configService: ConfigService,
    ) {
        super(repo);
    }


    async findInvoiceByPayment(options: { paymentId: number, status: StatusInvoce, stamping?: number }) {
        const invoice = this.repo.createQueryBuilder('invoice')
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
        const pathInvoice = `${this.configService.getPath()}comprobantes/academias/` + uuid.toUpperCase();
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
        const pathInvoice = `${this.configService.getPath()}comprobantes/academias/` + uuid.toUpperCase();
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
                    path: `${pathInvoice}.xml`,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    path: `${pathInvoice}.pdf`,
                },
                {
                    filename: `${uuid}-acuse.xml`,
                    path: pathInvoice + '-acuse.xml',
                },
            ],
        };
        return await transporter.sendMail(mailOptions);
    }

}
