import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartWeb } from '../Provider/swsmart.provider';
import { ConfigModule } from '../common/config/config.module';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademyController } from './credit-note-academy.controller';
import { CreditNoteAcademyService } from './credit-note-academy.service';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditNoteAcademy, BranchOfficeSetting], ColegioDBNameConnection),
    ConfigModule],
  controllers: [CreditNoteAcademyController],
  providers: [CreditNoteAcademyService, SmartWeb],
  exports: [CreditNoteAcademyService],
})
export class CreditNoteAcademyModule { }
