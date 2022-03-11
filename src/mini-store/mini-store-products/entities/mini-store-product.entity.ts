import { Column, Entity, ManyToOne, OneToMany, ValueTransformer } from 'typeorm';
import { MiniStorePriceList } from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreClassification } from '../../mini-store-classifications/entities/mini-store-classification.entity';
import { MiniStoreWarehouseOrderProduct } from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import { MiniStoreSaleDetail } from '../../store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { InvoiceKeys } from '../../../invoice/invoice-keys/entities/invoice-keys.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export const toJsonCal: ValueTransformer = {

    to(value: string): string {
        return value;
    },
    from(value: string): any {
        try {
            return JSON.parse(value);
        } catch (e) {
            return [];
        }
    },

};


@ObjectType()
@Entity('tie_productos')
export class MiniStoreProduct extends Base {
    @Field()
    @Column('varchar', {nullable: false, length: 100, name: 'nombre',})
    name: string;

    @Field()
    @Column('varchar', {nullable: false, length: 200, name: 'descripcion',})
    description: string;

    @Field()
    @Column('varchar', {nullable: false, length: 200, name: 'codigo',})
    code: string;

    @Field()
    @Column('varchar', {nullable: false, length: 25, name: 'sat_code',})
    sat_code: string;

    @Field({nullable: false})
    @Column('varchar', {nullable: true, length: 25, name: 'codigo_barra',})
    codeBar: string;

    @Field(type => Int)
    @Column('tinyint', {nullable: false, width: 1, name: 'activo',})
    isActive: boolean;

    @Field({nullable: true})
    @Column('decimal', {nullable: true, default: () => '\'0.000000\'', precision: 15, scale: 6, name: 'precio',})
    price: string;

    @Field()
    @Column('decimal', {nullable: true, default: () => '\'0.000000\'', precision: 15, scale: 6, name: 'precio_con_iva',})
    priceWithIVA: string;

    @Field()
    @Column('decimal', {nullable: false, default: () => '\'0.000000\'', precision: 15, scale: 6, name: 'precio_proveedor',})
    priceProvider: string;

    @Field()
    @Column('tinyint', {nullable: false, width: 1, name: 'iva',})
    IVA: boolean;

    @Field()
    @Column('tinyint', {nullable: false, width: 1,})
    isFavorite: boolean;

    @Field({nullable: true})
    @Column('text', {nullable: true,})
    picture: string;

    @Field(type => Int)
    @Column('decimal', {nullable: false, default: () => '\'0.000\'', precision: 15, scale: 3, name: 'stock',})
    stock: number;

    @Field({nullable: true})
    @Column('decimal', {nullable: true, default: () => '\'0.000\'', precision: 15, scale: 3, name: 'minstock',})
    minStock: number;

    @Field({nullable: true})
    @Column('decimal', {nullable: true, default: () => '\'0.000\'', precision: 15, scale: 3, name: 'maxstock',})
    maxStock: number;

    @Field({nullable: false})
    @Column('varchar', {nullable: false, length: 2, default: () => '\'02\''})
    objetoImp: string;

    @Field({nullable: false})
    @Column('varchar', {nullable: false, length: 20, default: () => '\'Pz\'', name: 'unidad'})
    unity: string;

    @Field({nullable: false})
    @Column('varchar', {nullable: false, default: () => '\'H87\''})
    unitMeasurement: string;

    @Field(type => MiniStorePriceList)
    @ManyToOne(() => MiniStorePriceList, (storePriceList) => storePriceList.storeProducts)
    storePriceList: MiniStorePriceList;

    @Field(type => MiniStoreClassification)
    @ManyToOne(() => MiniStoreClassification, (storeClassification) => storeClassification.storeProducts)
    storeClassification: MiniStoreClassification;

    @Field(type => [MiniStoreWarehouseOrderProduct])
    @OneToMany(() => MiniStoreWarehouseOrderProduct, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreProduct)
    miniStoreWarehouseOrdersProducts: MiniStoreWarehouseOrderProduct[];

    @Field(type => [MiniStoreSaleDetail])
    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreProduct)
    miniStoreSaleDetails: MiniStoreSaleDetail[];

    @Field(type => [MiniStoreProductsProviders])
    @OneToMany(() => MiniStoreProductsProviders, (mStore) => mStore.product,
        {
            cascade: ['insert', 'update'],
        })
    miniStoreProductsProvider: MiniStoreProductsProviders[];

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.id,
        {
            cascade: ['insert', 'update'],
        })
    branchOffice: BranchOffice;

}
