import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { Connection, getRepository, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataConverter } from '../../common/office/excel-tools/data-converter';
import { PriceProductsListReport } from './reports/price-products-list.report';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import * as moment from 'moment';
import { formatOperation } from '../store-sales/mini-store-sales/reports/mini-store-sale.report';
import { roundQuantity } from '../../common/point-of-sale/point-of-sale';
import { QueryReportProducts, ReportProductsRow } from './types/productsQuery';

@Injectable()
export class MiniStoreProductsService extends TypeOrmCrudService<
  MiniStoreProduct
> {
  constructor(
    @InjectConnection(ColegioDBNameConnection)
    private connection: Connection,
    @InjectRepository(MiniStoreProduct, ColegioDBNameConnection)
    readonly repo: Repository<MiniStoreProduct>,
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

  async paginate(
    options: IPaginationOptions,
    query: { branchOfficeId: number; startDate: string; endDate: string },
  ): Promise<any> {
    // Promise<Pagination<MiniStoreProduct>> {
    const total = await this.repo
      .createQueryBuilder('products')
      .leftJoin('products.miniStoreSaleDetails', 'miniStoreSaleDetails')
      .leftJoin('miniStoreSaleDetails.miniStoreSale', 'miniStoreSale')
      .select([
        'products.id as id',
        'products.name as name',
        'products.isFavorite as isFavorite',
        'products.calculation as calculation',
        'products.unity as unity',
        'products.unitMeasurement as unitMeasurement',
        'products.picture as picture',
      ])
      .addSelect('SUM(miniStoreSaleDetails.quantity)', 'quantity')
      .andWhere('miniStoreSale.createdAt BETWEEN :startDate AND :endDate', {
        startDate: moment(query.startDate).startOf('day').toDate(),
        endDate: moment(query.endDate).endOf('day').toDate(),
      })
      .groupBy('products.id')
      .getCount();
    const pagina = {
      count: options.limit,
      data: [],
      page: options.page,
      pageCount: Math.ceil(total / +options.limit),
      total,
    };
    const data = await this.repo
      .createQueryBuilder('products')
      .leftJoin('products.miniStoreSaleDetails', 'miniStoreSaleDetails')
      .leftJoin('miniStoreSaleDetails.miniStoreSale', 'miniStoreSale')
      .select([
        'products.id as id',
        'products.name as name',
        'products.isFavorite as isFavorite',
        'products.calculation as calculation',
        'products.unity as unity',
        'products.unitMeasurement as unitMeasurement',
        'products.picture as picture',
      ])
      .addSelect('SUM(miniStoreSaleDetails.quantity)', 'quantity')
      .andWhere('miniStoreSale.createdAt BETWEEN :startDate AND :endDate', {
        startDate: moment(query.startDate).startOf('day').toDate(),
        endDate: moment(query.endDate).endOf('day').toDate(),
      })
      .groupBy('products.id')
      .offset(
        options.page === 1
          ? 1
          : +options.page * +options.limit - +options.limit,
      )
      .limit(+options.limit)
      .getRawMany();
    for (const result of data) {
      result.quantity = roundQuantity(result.quantity);
      result.formula = formatOperation(
        JSON.parse(result.calculation),
        result.quantity,
      );
    }
    pagina.data = data;
    return pagina;
  }

  async createProduct(product: MiniStoreProduct): Promise<MiniStoreProduct> {
    const createdProduct = await this.repo.create(product);
    return await this.repo.save<MiniStoreProduct>(createdProduct);
  }

  public async ProductsList(query?: {
    priceListID: string;
    classificationID: string;
    onlyData?: boolean;
  }) {
    const queryBuilder = this.repo.createQueryBuilder('products');
    queryBuilder.leftJoinAndSelect(
      'products.storeClassification',
      'classification',
    );
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
    for (let key in result) {
      if (
        result[key] !== 'id' &&
        result[key] !== 'createdAt' &&
        result[key] !== 'updatedAt' &&
        result[key] !== 'version' &&
        result[key] !== 'uuid' &&
        result[key] !== 'calculation' &&
        result[key] !== 'miniStoreWarehouseOrdersProducts' &&
        result[key] !== 'miniStoreSaleDetails' &&
        result[key] !== 'miniStoreProductsProvider' &&
        result[key] !== 'unity' &&
        result[key] !== 'isActive'
      ) {
        entityKeys.push(result[key]);
      }
    }
    return entityKeys;
  }

  public async getEntityRelations() {
    const relations = this.repo.metadata.ownRelations.map(
      (relation) => relation.inverseEntityMetadata.targetName,
    );
    const relationsFields = this.repo.metadata.ownRelations.map(
      (relation) => relation.propertyName,
    );
    const relationsTrash = [
      'MiniStoreWarehouseOrderProduct',
      'MiniStoreSaleDetail',
      'MiniStoreProductsProviders',
    ];
    const relationsFieldTrash = [
      'miniStoreWarehouseOrdersProducts',
      'miniStoreSaleDetails',
      'miniStoreProductsProvider',
    ];
    const filteredRelations = relations.filter(
      (value) => !relationsTrash.includes(value),
    );
    const filteredFieldRelations = relationsFields.filter(
      (value) => !relationsFieldTrash.includes(value),
    );
    let relationsResult = {};
    let rowsCount = 0;
    let queryData: any = [];

    for (let relation of filteredRelations) {
      const repository = await getRepository(relation, ColegioDBNameConnection);
      let relationData = await repository.find({ select: ['name'] });
      relationData = JSON.parse(JSON.stringify(relationData));

      relationsResult[relation] = relationData;

      rowsCount = rowsCount + relationData.length;
    }

    return {
      relationsFields: filteredFieldRelations,
      relations: filteredRelations,
      relationsData: relationsResult,
      rowCount: rowsCount,
    };
  }

  async bulkStudents(products: MiniStoreProduct[]) {
    return await this.repo.save(products);
  }

  public async reportProducts({
    listId,
    classificationId,
  }: QueryReportProducts): Promise<ReportProductsRow[]> {
    let queryString = `SELECT * FROM vw_tie_products`;
    const listValid = listId !== undefined && listId.length > 0;
    const classificationValid =
      classificationId !== undefined && classificationId.length > 0;
    if (listValid && classificationId) {
      queryString = `${queryString} WHERE listId IN (${listId.join(', ')})`;
      queryString = `${queryString} AND classificationsId IN (${classificationId.join(
        ', ',
      )})`;
    } else if (listValid && !classificationValid) {
      queryString = `${queryString} WHERE listId IN  (${listId.join(', ')})`;
    } else if (!listValid && classificationValid) {
      queryString = `${queryString} WHERE classificationsId IN (${classificationId.join(
        ', ',
      )})`;
    }
    try {
      return this.connection.query(queryString);
    } catch (a) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }
}
