import { Module } from '@nestjs/common';
import { MiniStoreSalesController } from './mini-store-sales.controller';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreSale], ColegioDBNameConnection)],
    exports: [MiniStoreSalesService],
    controllers: [MiniStoreSalesController],
    providers: [MiniStoreSalesService],
})
export class MiniStoreSalesModule {
}
