import { Module } from '@nestjs/common';
import { InvoiceCompanyService } from './invoice-company.service';
import { InvoiceCompanyController } from './invoice-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceKeys } from '../invoice-keys/entities/invoice-keys.entity';
import { InvoiceCompany } from './entities/invoice-company.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceCompany], ColegioDBNameConnection)],
  providers: [InvoiceCompanyService],
  exports: [InvoiceCompanyService],
  controllers: [InvoiceCompanyController],
})
export class InvoiceCompanyModule {
}
