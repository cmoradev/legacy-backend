import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../common/config/config.module';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { SmartWeb } from '../Provider/swsmart.provider';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { CreditNoteSchoolController } from './credit-note-school.controller';
import { CreditNoteSchoolService } from './credit-note-school.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditNoteSchool, BranchOfficeSetting, BranchOffice], ColegioDBNameConnection), ConfigModule],
  controllers: [CreditNoteSchoolController],
  providers: [CreditNoteSchoolService, SmartWeb],
  exports: [CreditNoteSchoolService]
})
export class CreditNoteSchoolModule {}
