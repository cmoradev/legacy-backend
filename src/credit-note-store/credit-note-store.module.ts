import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { CreditNoteStoreController } from './credit-note-store.controller';
import { CreditNoteStoreService } from './credit-note-store.service';
import { CreditNoteStore } from './entities/credit-note-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditNoteStore], ColegioDBNameConnection)],
  controllers: [CreditNoteStoreController],
  providers: [CreditNoteStoreService],
  exports: [CreditNoteStoreService],
})
export class CreditNoteStoreModule {}
