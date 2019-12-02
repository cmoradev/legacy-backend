import { Module } from '@nestjs/common';
import { InvoiceMethodsPaymentsController } from './invoice-methods-payments.controller';
import { InvoiceMethodsPaymentsService } from './invoice-methods-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ InvoiceMethodPayment ], 'colegiodb') ],
  exports: [ InvoiceMethodsPaymentsService ],
  controllers: [InvoiceMethodsPaymentsController],
  providers: [InvoiceMethodsPaymentsService],
})
export class InvoiceMethodsPaymentsModule {}
