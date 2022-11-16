import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { Connection, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import * as moment from 'moment';
import {IQueryReportSaleToday, IQueryReportSaleTodayOp, IReportInformativeRow, IReportSaleTodayRow} from './types/IReport';

@Injectable()
export class MiniStoreSalesService extends TypeOrmCrudService<MiniStoreSale> {
    constructor(
        @InjectConnection(ColegioDBNameConnection)
    private connection: Connection,
        @InjectRepository(MiniStoreSale, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSale>,
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

    public async reportSaleToday({
        status,
        startDate,
        endDate,
        cycleId,
        branchOfficeId,
      }: IQueryReportSaleTodayOp): Promise<IReportSaleTodayRow[]> {
        let queryString = `SELECT * FROM vw_tie_sale_today where createdAt BETWEEN '${startDate}' AND '${endDate}'`;
        
        if(status){
            queryString = `${queryString} AND id_estado_pago = ${status}`;
        }
        if(cycleId){
            queryString = `${queryString} AND cycleId = ${cycleId}`;
        }
        if(branchOfficeId){
            queryString = `${queryString} AND branchOfficeId = ${branchOfficeId}`;
        }
        try {
          return this.connection.query(queryString);
        } catch (e) {
          throw new NotFoundException(
            `Error in query or conection [${queryString}]`,
          );
        }
      }

      public async reportInformative({
          startDate,
          endDate,
          cycleId,
          branchOfficeId,
      }: IQueryReportSaleToday): Promise<IReportInformativeRow[]> {
          let queryString = `SELECT * FROM vw_tie_informative where v_createdAt BETWEEN '${startDate}' AND '${endDate}'`;

          if(cycleId){
              queryString = `${queryString} AND v_cycleId = ${cycleId}`;
          }
          if(branchOfficeId){
              queryString = `${queryString} AND v_storeBranchOfficeId = ${branchOfficeId}`;
          }
          try {
              return this.connection.query(queryString);
          } catch (e) {
              throw new NotFoundException(
                  `Error in query or conection [${queryString}]`,
              );
          }
      }
}
