import { Module } from '@nestjs/common';
import { InvoiceUnitsService } from './invoice-units.service';
import { InvoiceUnitsController } from './invoice-units.controller';

@Module({
  providers: [InvoiceUnitsService],
  controllers: [InvoiceUnitsController]
})
export class InvoiceUnitsModule {}
