import { Module } from '@nestjs/common';
import { MiniStoreQuotationController } from './mini-store-quotation.controller';
import { MiniStoreQuotationService } from './mini-store-quotation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { MiniStoreQuotation } from './entities/mini-store-quotation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MiniStoreQuotation], ColegioDBNameConnection),
  ],
  controllers: [MiniStoreQuotationController],
  providers: [MiniStoreQuotationService],
  exports: [MiniStoreQuotationService],
})
export class MiniStoreQuotationModule {
}
