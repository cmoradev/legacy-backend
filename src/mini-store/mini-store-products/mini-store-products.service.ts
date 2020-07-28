import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import {getRepository, Repository} from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataConverter } from '../../common/office/excel-tools/data-converter';
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

    public async getEntityMetaData() {
        const result = this.repo.metadata.propertiesMap;
        const entityKeys = [];
        for(let key in result) {
            if( result[key] !== 'id' &&
                result[key] !== 'createdAt' &&
                result[key] !== 'updatedAt' &&
                result[key] !== 'version' &&
                result[key] !== 'uuid'  &&
                result[key] !== 'calculation' &&
                result[key] !== 'miniStoreWarehouseOrdersProducts' &&
                result[key] !== 'miniStoreSaleDetails' &&
                result[key] !== 'miniStoreProductsProvider' &&
                result[key] !== 'isActive' ){
                entityKeys.push(result[key]);
            }
        }
        return entityKeys;
    }

    public async getEntityRelations(){
        const relations = this.repo.metadata.ownRelations.map(relation => relation.inverseEntityMetadata.targetName);
        const relationsFields = this.repo.metadata.ownRelations.map(relation => relation.propertyName);
        const relationsTrash = ['MiniStoreWarehouseOrderProduct', 'MiniStoreSaleDetail', 'MiniStoreProductsProviders'];
        const relationsFieldTrash = ['miniStoreWarehouseOrdersProducts', 'miniStoreSaleDetails', 'miniStoreProductsProvider'];
        const filteredRelations = relations.filter(value => !relationsTrash.includes(value));
        const filteredFieldRelations = relationsFields.filter(value => !relationsFieldTrash.includes(value));
        let relationsResult = {};
        let rowsCount = 0;
        let queryData: any = [];

        for(let relation of filteredRelations){
            const repository = await getRepository(relation, ColegioDBNameConnection);
            let relationData = await repository.find({ select : ['name']});
            relationData = JSON.parse( JSON.stringify(relationData) );

            relationsResult[relation] =  relationData

            rowsCount = rowsCount + relationData.length;
        }

        return ({relationsFields: filteredFieldRelations, relations: filteredRelations, relationsData: relationsResult, rowCount: rowsCount});
    }
}
