import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';

@Injectable()
export class AcademyChargeDiscountsService extends TypeOrmCrudService<AcademyChargeDiscounts> {
    constructor(
        @InjectRepository(AcademyChargeDiscounts, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeDiscounts>,
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

    async getInvoiceDisscounts(id: number) {
        return await this.repo.find({
            where: {
                idCobroDetalle: id,
            },
        });
    }
}
