import { forwardRef, Module } from '@nestjs/common';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';
import { SchoolChargesInvoiceController } from './school-charges-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { UsersModule } from '../../../system/users/users.module';
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { SchoolChargesPaymentsModule } from '../school-charges-payments/school-charges-payments.module';
import { SmartWeb } from '../../../Provider/swsmart.provider';
import { ConfigModule } from '../../../common/config/config.module';
import { StorageModule } from '../../../common/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolChargesInvoice], ColegioDBNameConnection),
    UsersModule,
    BranchOfficeModule,
    BranchOfficeSettingModule,
    forwardRef(() => SchoolChargesPaymentsModule),
    ConfigModule,
    StorageModule
  ],
  providers: [SchoolChargesInvoiceService, SmartWeb],
  controllers: [SchoolChargesInvoiceController],
  exports: [SchoolChargesInvoiceService],
})
export class SchoolChargesInvoiceModule {
}
