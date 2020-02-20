import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopTrendingProductsReport } from './reports/top-trending-products.report';
import { DataConverter } from '../../../common/excel-tools/data-converter';
import moment = require('moment');
import { TopTrendingProduct } from './interfaces/top-trending-product.interface';

@Injectable()
export class MiniStoreSalesDetailsService extends TypeOrmCrudService<MiniStoreSaleDetail> {
    constructor(@InjectRepository(MiniStoreSaleDetail, 'colegiodb') readonly repo: Repository<MiniStoreSaleDetail>) {
        super(repo);
    }

    public async topTrendingProductsReport(query: { startDate: Date; endDate: Date; onlyData?: boolean }) {
        const report = new TopTrendingProductsReport();
        const converter = new DataConverter();
        const startDate = moment(query && query.startDate || new Date()).startOf('day').toISOString(true);
        const endDate = moment(query && query.endDate || new Date()).endOf('day').toISOString(true);

        const QBuilder = this.repo.createQueryBuilder('productDetails');
        QBuilder.leftJoin('productDetails.miniStoreProduct', 'product');
        QBuilder.leftJoin('productDetails.miniStoreClassification', 'productClassification');
        QBuilder.where(`productDetails.createdAt >= :startDate AND productDetails.createdAt <= :endDate`, {
            startDate,
            endDate,
        });
        QBuilder.groupBy('productDetails.idProduct');
        QBuilder.addGroupBy('productDetails.idClassification');
        QBuilder.addGroupBy('product.id');
        QBuilder.addGroupBy('productClassification.id');
        QBuilder.select('productClassification.name', 'classificationName');
        QBuilder.addSelect('product.name', 'productName');
        QBuilder.addSelect('SUM(productDetails.quantity)', 'quantity');
        const products: TopTrendingProduct[] = await QBuilder.getRawMany();
        if (query && query.onlyData) {
            return products || [];
        }
        return converter.convert(report.generate(products), { base64: true });
    }
}
