import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../common/config/config.module';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { SmartWeb } from '../Provider/swsmart.provider';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteStoreController } from './credit-note-store.controller';
import { CreditNoteStoreService } from './credit-note-store.service';
import { CreditNoteStore } from './entities/credit-note-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditNoteStore, BranchOfficeSetting], ColegioDBNameConnection), ConfigModule],
  controllers: [CreditNoteStoreController],
  providers: [CreditNoteStoreService, SmartWeb],
  exports: [CreditNoteStoreService],
})
export class CreditNoteStoreModule {}
