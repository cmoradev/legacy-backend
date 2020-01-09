import { Module } from '@nestjs/common';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';
import { MiniStoreSalesReturnsController } from './mini-store-sales-returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesReturns } from './entities/sales-returns.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([SalesReturns], ColegioDBNameConnection)],
    providers: [MiniStoreSalesReturnsService],
    exports: [MiniStoreSalesReturnsService],
    controllers: [MiniStoreSalesReturnsController],
})
export class MiniStoreSalesReturnsModule {
}
