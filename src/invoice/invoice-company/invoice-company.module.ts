import { Module } from '@nestjs/common';
import { InvoiceCompanyService } from './invoice-company.service';
import { InvoiceCompanyController } from './invoice-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceKeys } from '../invoice-keys/entities/invoice-keys.entity';
import { InvoiceCompany } from './entities/invoice-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceCompany], 'colegiodb')],
  providers: [InvoiceCompanyService],
  exports: [InvoiceCompanyService],
  controllers: [InvoiceCompanyController],
})
export class InvoiceCompanyModule {
}
