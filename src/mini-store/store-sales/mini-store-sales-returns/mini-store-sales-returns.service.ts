import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SalesReturns } from './entities/sales-returns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { InvoicementStatusEnum } from '../mini-store-invoices/enums/invoicement-status.enum';

@Injectable()
export class MiniStoreSalesReturnsService extends TypeOrmCrudService<SalesReturns> {
    constructor(@InjectRepository(SalesReturns, ColegioDBNameConnection) repo) {
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

    async getReturnDetails(id: number) {
        return await this.repo.findOne({
            where: {
                id,
            },
            relations: ['sale', 'details', 'details.saleDetail', 'details.saleDetail.miniStoreProduct', 'details.saleDetail.miniStoreProduct.storeInvoiceKey', 'paymentMethod'],
        });
    }

    async updateSaleReturn(id: number, status: InvoicementStatusEnum) {
        return await this.repo.update({ id }, { invoiceStatus: status });
    }
}
	