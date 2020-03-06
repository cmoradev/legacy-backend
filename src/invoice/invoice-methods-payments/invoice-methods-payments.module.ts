import { Module } from '@nestjs/common';
import { InvoiceMethodsPaymentsController } from './invoice-methods-payments.controller';
import { InvoiceMethodsPaymentsService } from './invoice-methods-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ InvoiceMethodPayment ], ColegioDBNameConnection) ],
  exports: [ InvoiceMethodsPaymentsService ],
  controllers: [InvoiceMethodsPaymentsController],
  providers: [InvoiceMethodsPaymentsService],
})
export class InvoiceMethodsPaymentsModule {}
