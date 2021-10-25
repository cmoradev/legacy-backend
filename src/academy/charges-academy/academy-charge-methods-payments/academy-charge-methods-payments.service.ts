import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeMethodsPayments } from './entities/academy-charge-methods-payments.entity';

@Injectable()
export class AcademyChargeMethodsPaymentsService extends TypeOrmCrudService<AcademyChargeMethodsPayments> {
    constructor(
        @InjectRepository(AcademyChargeMethodsPayments, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeMethodsPayments>,
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
