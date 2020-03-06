import { Module } from '@nestjs/common';
import { MiniStorePricesListsController } from './mini-store-prices-lists.controller';
import { MiniStorePricesListsService } from './mini-store-prices-lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStorePriceList } from './entities/mini-store-price-list.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([MiniStorePriceList], ColegioDBNameConnection)],
  exports: [ MiniStorePricesListsService ],
  controllers: [ MiniStorePricesListsController ],
  providers: [ MiniStorePricesListsService ],
})
export class MiniStorePricesListsModule {}
