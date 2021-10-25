import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PaymentPlanConcept } from './entities/payment-plan-concept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class PaymentPlanConceptsService extends TypeOrmCrudService<PaymentPlanConcept> {
    constructor(@InjectRepository(PaymentPlanConcept, ColegioDBNameConnection) readonly paymentPlanConceptRepository: Repository<PaymentPlanConcept>) {
        super(paymentPlanConceptRepository);
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
