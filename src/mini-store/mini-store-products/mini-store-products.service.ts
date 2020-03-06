import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataConverter } from '../../common/excel-tools/data-converter';
import { PriceProductsListReport } from './reports/price-products-list.report';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MiniStoreProductsService extends TypeOrmCrudService<MiniStoreProduct> {
    constructor(
        @InjectRepository(MiniStoreProduct, ColegioDBNameConnection) readonly repo: Repository<MiniStoreProduct>,
    ) {
        super(repo);
    }

    async createProduct(product: MiniStoreProduct): Promise<MiniStoreProduct> {
        const createdProduct = await this.repo.create(product);
        return await this.repo.save<MiniStoreProduct>(createdProduct);
    }

    public async ProductsList(query?: { priceListID: string; classificationID: string, onlyData?: boolean }) {
        const queryBuilder = this.repo.createQueryBuilder('products');
        queryBuilder.leftJoinAndSelect('products.storeClassification', 'classification');
        queryBuilder.leftJoinAndSelect('products.storePriceList', 'priceList');
        queryBuilder.where('products.id');
        if (query) {
            if (query.classificationID) {
                queryBuilder.andWhere(`classification.id = :classificationID`, {
                    classificationID: query.classificationID,
                });
            }
            if (query.priceListID) {
                queryBuilder.andWhere(`priceList.id = :priceListID`, {
                    priceListID: query.priceListID,
                });
            }
        }
        const products = await queryBuilder.getMany();
        const converter = new DataConverter();
        const report = new PriceProductsListReport();
        if (query && query.onlyData) {
            return products;
        }
        return converter.convert(report.generate(products), { base64: true });

    }
}
