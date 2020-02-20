import { Module } from '@nestjs/common';
import { MiniStoreSalesController } from './mini-store-sales.controller';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreSale], 'colegiodb')],
    exports: [MiniStoreSalesService],
    controllers: [MiniStoreSalesController],
    providers: [MiniStoreSalesService],
})
export class MiniStoreSalesModule {
}
