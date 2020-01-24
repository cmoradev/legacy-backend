import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SalesReturns } from './entities/sales-returns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { InvoicementStatusEnum } from '../mini-store-invoices/enums/invoicement-status.enum';

@Injectable()
export class MiniStoreSalesReturnsService extends TypeOrmCrudService<SalesReturns> {
  constructor(@InjectRepository(SalesReturns, ColegioDBNameConnection) repo) {
    super(repo);
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
