import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import {Connection, Repository} from 'typeorm';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';
import {IQueryReportSaleTodayOp} from '../../../mini-store/store-sales/mini-store-sales/types/IReport';
import {NotInvoiced, VWPaymentExtraCharge} from '../../../common/interface/not-invoiced.interface';

@Injectable()
export class AcademyChargeDetailsService extends TypeOrmCrudService<AcademyChargeDetails> {
    constructor(
        @InjectRepository(AcademyChargeDetails, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeDetails>,
        @InjectConnection(ColegioDBNameConnection) private connection: Connection,
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

    public async reportSaleAcademia({
        startDate,
        endDate,
        cycleId,
        branchOfficeId,
                                    }: IQueryReportSaleTodayOp): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT * FROM vw_aca_sales where v_created_at BETWEEN '${startDate}' AND '${endDate}' AND v_status = 2`;

        if (cycleId) {
            queryString = `${queryString} AND v_cycle = ${cycleId}`;
        }
        if (branchOfficeId) {
            queryString = `${queryString} AND v_branch_office = ${branchOfficeId}`;
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
