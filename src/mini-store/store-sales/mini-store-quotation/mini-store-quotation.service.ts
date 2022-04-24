import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { MiniStoreQuotation } from './entities/mini-store-quotation.entity';
import { saleDetails } from '../../../common/point-of-sale/point-of-sale';
import * as moment from 'moment';

@Injectable()
export class MiniStoreQuotationService extends TypeOrmCrudService<MiniStoreQuotation> {
    constructor(
        @InjectRepository(MiniStoreQuotation, ColegioDBNameConnection) readonly repo: Repository<MiniStoreQuotation>,
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

    async findQuotation(idQuoations: number) {
        return await this.repo.createQueryBuilder('cotizacion')
            .leftJoinAndSelect('cotizacion.quotation', 'quotation')
            .where('quotation.id= :id', {
                id: idQuoations,
            }).getOne();
    }

    async updateQuotation(data: MiniStoreQuotation) {
        return await this.repo.save(data);
    }

    async report(query: {
        status: number;
        startDate: Date;
        endDate: Date;
        cashier?: number;
        onlyFile: boolean;
        branchOfficeId: number;
    }) {
        const quotations = this.repo.createQueryBuilder('cotizacion')
            .leftJoinAndSelect('cotizacion.quotation', 'quotation')
            .leftJoinAndSelect('quotation.miniStoreSaleDetails', 'quotation_miniStoreSaleDetails')
            .leftJoinAndSelect('quotation_miniStoreSaleDetails.extraCharges', 'quotation_extraCharges')
            .leftJoinAndSelect('quotation.cashier', 'quotation_cashier')
            .leftJoinAndSelect('quotation.student', 'quotation_student')
            .leftJoinAndSelect('quotation.storeBranchOffice', 'quotation_storeBranchOffice')


            .leftJoinAndSelect('cotizacion.sale', 'sale')
            .leftJoinAndSelect('sale.miniStoreSaleDetails', 'sale_miniStoreSaleDetails')
            .leftJoinAndSelect('sale_miniStoreSaleDetails.extraCharges', 'sale_extraCharges')
            .leftJoinAndSelect('sale.cashier', 'sale_cashier')
            .leftJoinAndSelect('sale.student', 'sale_student')
            .where('quotation_storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            })
            .andWhere('quotation.isComplete = :status', {
                status: query.status,
            })
            .andWhere('quotation.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });

        if (query.cashier) {
            quotations.andWhere('quotation_cashier.id = :agentID', { agentID: query.cashier });
        }
        const newquotations = await quotations.getMany();

        const restructura = [];
        for (const quotation of newquotations) {
            const data = {
                createdAt: quotation.quotation.createdAt,
                expiredAt: quotation.quotation.expiredAt,
                cashier: quotation.quotation.cashier.name,
                folio: quotation.quotation.folio,
                customer: quotation.quotation.student.name,
                observation: quotation.quotation.observations,
                idQuotation: quotation.quotation.id,
                idSale: 0,
                amount: saleDetails({
                    details: quotation.quotation.miniStoreSaleDetails ?? []
                }).total,
                saleFolio: '',
                finalizador: '',
                total: '',
                finishDate: '',
            };

            if (quotation.sale) {
                data.saleFolio = quotation.sale.folio;
                data.idSale = quotation.sale.id;
                data.finalizador = quotation.sale.cashier.name;
                data.total = saleDetails({
                    details: quotation.sale.miniStoreSaleDetails ?? []
                }).total.toString();
                data.finishDate = quotation.sale.createdAt.toString();
            }
            restructura.push(data);
        }
        return restructura;

    }
}
