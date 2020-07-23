import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail-service.service';
import { MiniStoreSalePayment } from '../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { JwtGuard } from '../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Controller()
export class MailServiceController {
    constructor(private readonly mailservice: MailService) {
    }

    @Post('send-invoice-payment')
    sendTestMail(@Body() options: { uuid: string, payment: MiniStoreSalePayment, emailAddresses: string }) {
        return this.mailservice.sendInvoicePayment(options);
    }

    @Get('test')
    TestMail() {
        return this.mailservice.test();
    }
}
