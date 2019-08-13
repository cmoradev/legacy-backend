import { Module } from '@nestjs/common';
import { InvoicesMethodsPaymentsController } from './invoices-methods-payments.controller';
import { InvoicesMethodsPaymentsService } from './invoices-methods-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ InvoiceMethodPayment ], 'colegiodb') ],
  exports: [ InvoicesMethodsPaymentsService ],
  controllers: [InvoicesMethodsPaymentsController],
  providers: [InvoicesMethodsPaymentsService],
})
export class InvoicesMethodsPaymentsModule {}
