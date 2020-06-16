import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import * as handlebars from 'handlebars';
import { receiptPayment } from './templates/receipt-payment';
import * as moment from 'moment';
import { MailerOptions } from './interfaces/mailer-options.interface';
import { MiniStoreSalePayment } from '../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { date } from '@hapi/joi';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    public async sendInvoicePayment(options: { uuid: string, payment: MiniStoreSalePayment, emailAddresses: string }) {
        const { uuid, payment, emailAddresses } = options;
        const result = handlebars.compile(receiptPayment().html);
        const emailBody = result({
            OrderNumber: payment.folio || 'XXXX-XXXX',
            OrderDate: moment(payment.createdAt).format('DD-MM-YYYY a las h:mm:ss a'),
            TotalPrice: `$${(+payment.quantity).toFixed(2)}`,
        });
        const mailOptions: MailerOptions = {
            to: emailAddresses,
            from: 'developers@colegioinglesplaya.com',
            subject: 'Factura de pago',
            text: 'Factura de pago',
            html: emailBody,
            attachments: ['pdf', 'xml', 'png'].map(extension => {
                return {
                    filename: `${uuid}.${extension}`,
                    path: `/var/www/pdc/comprobantes/tienda/${uuid}.${extension}`,
                };
            }),
        };
        return await this.mailerService.sendMail(mailOptions);
    }

    public async test() {
        const result = handlebars.compile(receiptPayment().html);
        const emailBody = result({
            OrderNumber: 'XXXX-XXXX',
            OrderDate: moment(new Date()).format('DD-MM-YYYY a las h:mm:ss a'),
            TotalPrice: 0,
        });

        const mailOptions: MailerOptions = {
            to: 'signatidev@gmail.com',
            from: 'developers@colegioinglesplaya.com',
            subject: 'Factura de pago',
            text: 'Factura de pago',
            html: emailBody,
        };
        return await this.mailerService.sendMail(mailOptions);
    }
}
