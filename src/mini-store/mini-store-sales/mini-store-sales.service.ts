import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MiniStoreSalesService extends TypeOrmCrudService<MiniStoreSale> {
    constructor(
        @InjectRepository(MiniStoreSale, 'colegiodb') readonly repo: Repository<MiniStoreSale>,
    ) { super(repo); }
}
