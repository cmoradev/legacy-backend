import { Module } from '@nestjs/common';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';
import { AcademyChargeInvoiceController } from './academy-charge-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyChargeInvoice], ColegioDBNameConnection)],
  providers: [AcademyChargeInvoiceService],
  controllers: [AcademyChargeInvoiceController],
})
export class AcademyChargeInvoiceModule {
}
