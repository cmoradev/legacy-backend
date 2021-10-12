import { Module } from '@nestjs/common';
import { InvoicesBankController } from './invoices-bank.controller';
import { InvoicesBankService } from './invoices-bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesBank } from './entities/invoices-bank.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ InvoicesBank ], ColegioDBNameConnection) ],
  exports: [ InvoicesBankService ],
  controllers: [InvoicesBankController],
  providers: [InvoicesBankService],
})
export class InvoicesBankModule {}
