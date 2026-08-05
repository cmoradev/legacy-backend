import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../common/config/config.module';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { SmartWeb } from '../Provider/swsmart.provider';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademyController } from './credit-note-academy.controller';
import { CreditNoteAcademyService } from './credit-note-academy.service';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
import { AcademyChargeInvoiceModule } from '../academy/charges-academy/academy-charge-invoice/academy-charge-invoice.module';
import { BranchOfficeModule } from '../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../system/branch-office-setting/branch-office-setting.module';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditNoteAcademy, BranchOfficeSetting], ColegioDBNameConnection),
    ConfigModule, AcademyChargeInvoiceModule, BranchOfficeModule, BranchOfficeSettingModule, StorageModule],
  controllers: [CreditNoteAcademyController],
  providers: [CreditNoteAcademyService, SmartWeb],
  exports: [CreditNoteAcademyService],
})
export class CreditNoteAcademyModule { }
