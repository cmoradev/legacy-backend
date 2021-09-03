import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class PaymentPlansService extends TypeOrmCrudService<PaymentPlan> {
    constructor(@InjectRepository(PaymentPlan, ColegioDBNameConnection) private readonly paymentPlanRepository: Repository<PaymentPlan>) {
        super(paymentPlanRepository);
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

    async getPaymentsPlayWithConcepts() {
        return this.paymentPlanRepository.createQueryBuilder('paymentPlan')
            .innerJoinAndSelect('paymentPlan.paymentPlanConcepts', 'concepts')
            .getMany();
    }

    async getPaymentPlanWIthLevel() {
        return this.paymentPlanRepository.createQueryBuilder('paymentPlan')
            .innerJoinAndSelect('paymentPlan.level', 'level')
            .innerJoinAndSelect('paymentPlan.studyPlan', 'studyPlan')
            .getMany();
    }
}
