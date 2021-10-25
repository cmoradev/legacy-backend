import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';

@Injectable()
export class MiniStoreSalesMethodsPaymentsService extends TypeOrmCrudService<MiniStoreSaleMethodPayment> {
    constructor(
        @InjectRepository(MiniStoreSaleMethodPayment, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSaleMethodPayment>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }
}
