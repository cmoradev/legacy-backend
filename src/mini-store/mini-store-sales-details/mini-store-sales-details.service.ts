import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopTrendingProductsReport } from './reports/top-trending-products.report';
import { DataConverter } from '../../common/excel-tools/data-converter';
import moment = require('moment');

@Injectable()
export class MiniStoreSalesDetailsService extends TypeOrmCrudService<MiniStoreSaleDetail> {
    constructor(@InjectRepository(MiniStoreSaleDetail, 'colegiodb') readonly repo: Repository<MiniStoreSaleDetail>) {
        super(repo);
    }

    public async topTrendingProductsReport(query: { startDate: Date; endDate: Date }) {
        const report = new TopTrendingProductsReport();
        const converter = new DataConverter();
        const startDate = moment(query && query.startDate || new Date()).startOf('day').toISOString(true);
        const endDate = moment(query && query.endDate || new Date()).endOf('day').toISOString(true);

        const QBuilder = this.repo.createQueryBuilder('productDetails');
        QBuilder.leftJoinAndSelect('productDetails.miniStoreProduct', 'product');
        QBuilder.where(`productDetails.createdAt >= :startDate AND productDetails.createdAt <= :endDate`, {
            startDate,
            endDate,
        });
        const products = await QBuilder.getMany();
        return converter.convert(report.generate(products));
    }
}
