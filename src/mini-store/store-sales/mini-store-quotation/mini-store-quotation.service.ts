import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { MiniStoreQuotation } from './entities/mini-store-quotation.entity';
import { saleDetails } from '../../../common/point-of-sale/miniStore-point-of-sale';

@Injectable()
export class MiniStoreQuotationService extends TypeOrmCrudService<MiniStoreQuotation> {
    constructor(
      @InjectRepository(MiniStoreQuotation, ColegioDBNameConnection) readonly repo: Repository<MiniStoreQuotation>,
    ) {
        super(repo);
    }

    async updateQuotation(data: MiniStoreQuotation) {
        return await this.repo.save(data);
    }

    async report() {
        const quotations = await this.repo.createQueryBuilder('cotizacion')
          .leftJoinAndSelect('cotizacion.quotation', 'quotation')
          .leftJoinAndSelect('quotation.miniStoreSaleDetails', 'quotation_miniStoreSaleDetails')
          .leftJoinAndSelect('quotation_miniStoreSaleDetails.extraCharges', 'quotation_extraCharges')

          .leftJoinAndSelect('quotation.cashier', 'quotation_cashier')
          .leftJoinAndSelect('quotation.student', 'quotation_student')

          .leftJoinAndSelect('cotizacion.sale', 'sale')
          .leftJoinAndSelect('sale.miniStoreSaleDetails', 'sale_miniStoreSaleDetails')
          .leftJoinAndSelect('sale_miniStoreSaleDetails.extraCharges', 'sale_extraCharges')
          .leftJoinAndSelect('sale.cashier', 'sale_cashier')
          .leftJoinAndSelect('sale.student', 'sale_student')
          .getMany();
        const restructura = [];
        for (const quotation of quotations) {
            const data = {
                createdAt: quotation.quotation.createdAt,
                expiredAt: quotation.quotation.expiredAt,
                cashier: quotation.quotation.cashier.name,
                folio: quotation.quotation.folio,
                customer: quotation.quotation.student.name,
                observation: quotation.quotation.observations,
                idQuotation: quotation.quotation.id,
                idSale: 0,
                amount: saleDetails(quotation.quotation.miniStoreSaleDetails ?? []).total,
                saleFolio: '',
                finalizador: '',
                total: '',
                finishDate: '',
            };

            if (quotation.sale) {
                data.saleFolio = quotation.sale.folio;
                data.idSale = quotation.sale.id;
                data.finalizador = quotation.sale.cashier.name;
                data.total = saleDetails(quotation.sale.miniStoreSaleDetails ?? []).total.toString();
                data.finishDate = quotation.sale.createdAt.toString();
            }
            restructura.push(data);
        }
        return restructura;

    }
}
