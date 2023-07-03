import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../common/config/config.module';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { SmartWeb } from '../Provider/swsmart.provider';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { CreditNoteSchoolController } from './credit-note-school.controller';
import { CreditNoteSchoolService } from './credit-note-school.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';
import { SchoolChargesInvoiceModule } from '../school-colegio-ingles/charges-school/school-charges-invoice/school-charges-invoice.module';
import { BranchOfficeModule } from '../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../system/branch-office-setting/branch-office-setting.module';

@Module({
  imports: [TypeOrmModule.forFeature([CreditNoteSchool, BranchOfficeSetting, BranchOffice], ColegioDBNameConnection), ConfigModule,
  SchoolChargesInvoiceModule, BranchOfficeModule, BranchOfficeSettingModule
  ],
  controllers: [CreditNoteSchoolController],
  providers: [CreditNoteSchoolService, SmartWeb],
  exports: [CreditNoteSchoolService]
})
export class CreditNoteSchoolModule {}
