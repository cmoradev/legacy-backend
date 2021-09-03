import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class InvoiceMethodsPaymentsService extends TypeOrmCrudService<InvoiceMethodPayment> {
    constructor(
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly repo: Repository<InvoiceMethodPayment>,
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

    async get_payment_methods_active() {
        return await this.repo.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });
    }
}
