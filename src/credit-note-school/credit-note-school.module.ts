import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { CreditNoteSchoolController } from './credit-note-school.controller';
import { CreditNoteSchoolService } from './credit-note-school.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditNoteSchool], ColegioDBNameConnection)],
  controllers: [CreditNoteSchoolController],
  providers: [CreditNoteSchoolService],
  exports: [CreditNoteSchoolService]
})
export class CreditNoteSchoolModule {}
