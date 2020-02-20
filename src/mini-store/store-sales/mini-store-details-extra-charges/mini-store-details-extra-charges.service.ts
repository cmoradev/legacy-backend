import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiniStoreDetailsExtraCharges } from './entities/mini-store-details-extra-charges.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class MiniStoreDetailsExtraChargesService extends TypeOrmCrudService<MiniStoreDetailsExtraCharges> {
    constructor(
        @InjectRepository(MiniStoreDetailsExtraCharges, ColegioDBNameConnection) readonly repo: Repository<MiniStoreDetailsExtraCharges>,
    ) {
        super(repo);
    }
}
