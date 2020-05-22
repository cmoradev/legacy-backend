import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Between } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class MiniStoreSalesService extends TypeOrmCrudService<MiniStoreSale> {
    constructor(
        @InjectRepository(MiniStoreSale, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSale>,
    ) {
        super(repo);
    }

    async reportCatCasherProd(query: {
        status: number,
        startDate: Date,
        endDate: Date,
        cashier?: number,
        branchOfficeId: number;
    }) {

        const sales = this.repo.createQueryBuilder('sales')
            .leftJoinAndSelect('sales.storeBranchOffice', 'storeBranchOffice')
            .leftJoinAndSelect('sales.cashier', 'cashier')
            .leftJoinAndSelect('sales.miniStoreSaleDetails', 'details')
            .leftJoinAndSelect('details.miniStoreClassification', 'clasification')
            .leftJoinAndSelect('details.extraCharges', 'charges')
            .leftJoinAndSelect('details.miniStoreProduct', 'product')
            .select([
                'sales.id',
                'sales.folio',
                'sales.statusSale',
                'sales.observations',
                'sales.iva',
                'sales.isIVA',
                'sales.createdAt',
                'details.id',
                'details.productCode',
                'details.productName',
                'details.quantity',
                'details.unitMeasurement',
                'details.priceWithIVA',
                'details.price',
                'clasification.id',
                'clasification.name',
                'charges',
                'product.id',
                'product.IVA',
                'cashier.id',
                'cashier.name',
                'cashier.lastnameFather',
                'cashier.lastnameMother',
            ])
            .where('storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            })
            .andWhere('sales.statusSale= :status', {
                status: query.status,
            })
            .andWhere('sales.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
        /*sif (query.cashier) {
            sales.andWhere('cashier.id = :cashier', { cashier: query.cashier });
        }*/

        return await sales.getMany();

    }
}
