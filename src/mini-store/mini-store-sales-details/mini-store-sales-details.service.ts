import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreSalesDetailsService extends TypeOrmCrudService<MiniStoreSaleDetail> {
    constructor(
        @InjectRepository(MiniStoreSaleDetail, 'colegiodb') readonly repo: Repository<MiniStoreSaleDetail>,
    ) { super(repo); }
}
