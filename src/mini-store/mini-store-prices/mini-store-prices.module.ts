import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { MiniStorePrices } from './entities/mini-store-prices.entity';
import { MiniStorePricesController } from './mini-store-prices.controller';
import { MiniStorePricesService } from './mini-store-prices.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStorePrices], ColegioDBNameConnection)
    ],
    exports: [MiniStorePricesService],
    providers: [MiniStorePricesService],
    controllers: [MiniStorePricesController],
})
export class MiniStorePricesModule {
}