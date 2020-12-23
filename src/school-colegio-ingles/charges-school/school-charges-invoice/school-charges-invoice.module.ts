import { forwardRef, Module } from '@nestjs/common';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';
import { SchoolChargesInvoiceController } from './school-charges-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { UsersModule } from '../../../system/users/users.module';
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { SchoolChargesPaymentsModule } from '../school-charges-payments/school-charges-payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolChargesInvoice], ColegioDBNameConnection),
    UsersModule,
    BranchOfficeModule,
    BranchOfficeSettingModule,
    forwardRef(() => SchoolChargesPaymentsModule)],
  providers: [SchoolChargesInvoiceService],
  controllers: [SchoolChargesInvoiceController],
  exports: [SchoolChargesInvoiceService],
})
export class SchoolChargesInvoiceModule {
}
