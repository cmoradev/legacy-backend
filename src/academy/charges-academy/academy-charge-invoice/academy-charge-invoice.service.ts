import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { MiniStoreInvoice } from '../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';

@Injectable()
export class AcademyChargeInvoiceService extends TypeOrmCrudService<AcademyChargeInvoice> {
    constructor(
        @InjectRepository(AcademyChargeInvoice, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeInvoice>,
    ) {
        super(repo);
    }


    async findInvoiceByPayment(options: { paymentId: number, status: StatusInvoce, stamping?: number }) {
        const invoice = this.repo.createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.academyChargePayment', 'academyChargePayment')
            .where('invoice.status = :status', {
                status: options.status,
            })
            .where('academyChargePayment.id= :paymentId', {
                paymentId: options.paymentId,
            });
        if (options.stamping) {
            invoice.andWhere('academyChargePayment.stamping= :stamping', {
                stamping: options.stamping,
            });
        }

        return await invoice.getOne();
    }

    async saveInvoice(data: AcademyChargeInvoice) {
        const invoice = await this.repo.create(data);
        return await this.repo.save(invoice);
    }

    async updateInvoice(data: AcademyChargeInvoice) {
        let invoice = await this.repo.findOne({ id: data.id });
        invoice = { ...data };
        return await this.repo.save(invoice);
    }
}
