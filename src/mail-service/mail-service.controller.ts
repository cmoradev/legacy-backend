import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail-service.service';
import { MiniStoreSalePayment } from '../mini-store/mini-store-sales-payments/entities/mini-store-sale-payment.entity';

@Controller('mini-store')
export class MailServiceController {
    constructor(private readonly mailservice: MailService) {
    }

    @Post('send-invoice-payment')
    sendTestMail(@Body() options: { uuid: string, payment: MiniStoreSalePayment, emailAddresses: string }) {
        return this.mailservice.sendInvoicePayment(options);
    }
}
