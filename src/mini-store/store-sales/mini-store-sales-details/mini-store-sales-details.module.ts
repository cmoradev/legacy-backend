import { Module } from '@nestjs/common';
import { MiniStoreSalesDetailsController } from './mini-store-sales-details.controller';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MiniStoreSaleDetail], 'colegiodb')],
  exports: [MiniStoreSalesDetailsService],
  controllers: [MiniStoreSalesDetailsController],
  providers: [MiniStoreSalesDetailsService],
})
export class MiniStoreSalesDetailsModule {}
