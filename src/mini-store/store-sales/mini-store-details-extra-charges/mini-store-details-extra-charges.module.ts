import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { MiniStoreDetailsExtraCharges } from './entities/mini-store-details-extra-charges.entity';
import { MiniStoreDetailsExtraChargesService } from './mini-store-details-extra-charges.service';
import { MiniStoreDetailsExtraChargesController } from './mini-store-details-extra-charges.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreDetailsExtraCharges], ColegioDBNameConnection)],
    providers: [MiniStoreDetailsExtraChargesService],
    controllers: [MiniStoreDetailsExtraChargesController],
})
export class MiniStoreDetailsExtraChargesModule {
}
