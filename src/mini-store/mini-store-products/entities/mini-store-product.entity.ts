import { Column, Entity, ManyToOne, OneToMany, ValueTransformer } from 'typeorm';
import { MiniStorePriceList } from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreClassification } from '../../mini-store-classifications/entities/mini-store-classification.entity';
import { MiniStoreWarehouseOrderProduct } from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import { MiniStoreSaleDetail } from '../../store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { InvoiceKeys } from '../../../invoice/invoice-keys/entities/invoice-keys.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from 'type-graphql';

export const toJsonCal: ValueTransformer = {

    to(value: string): string {
        return value;
    },
    from(value: string): any {
        try {
            return JSON.parse(value);
        } catch (e) {
            console.log(value)
            console.log('fallo al parcear',e.message);
            return [];
        }
    },

};


@ObjectType()
@Entity('tie_productos')
export class MiniStoreProduct extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'nombre',
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'descripcion',
    })
    description: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'codigo',
    })
    code: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 25,
        name: 'codigo_barra',
    })
    codeBar: string | null;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'activo',
    })
    isActive: boolean;

    @Field({ nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string | null;

    @Field()
    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio_con_iva',
    })
    priceWithIVA: string;

    @Field()
    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio_proveedor',
    })
    priceProvider: string;

    @Field()
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'iva',
    })
    IVA: boolean;

    @Field()
    @Column('tinyint', {
        nullable: false,
        width: 1,
    })
    isFavorite: boolean;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
    })
    picture: string | null;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000\'',
        precision: 15,
        scale: 3,
        name: 'stock',
    })
    stock: number;

    @Field({ nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000\'',
        precision: 15,
        scale: 3,
        name: 'minstock',
    })
    minStock: number | null;

    @Field({ nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000\'',
        precision: 15,
        scale: 3,
        name: 'maxstock',
    })
    maxStock: number | null;

    // tslint:disable-next-line:jsdoc-format
    /** @Deprecated **/
        // @By Amir no se ocupa en nigun lado pero falta verificar en la vista

    @Field({ nullable: false })
    @Column('varchar', {
        nullable: false,
        length: 20,
        default: () => '\'Pieza\'',
        name: 'unidad',
    })
    unity: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
    })
    unitMeasurement: number;

    // '[{\"value\":0,\"leftOperation\":[],\"rightOperation\":[],\"type\":1,\"position\":1}]'
    @Field()
    @Column({
        type: 'longtext',
        nullable: true,
        transformer: toJsonCal,
    })
    calculation: string;

    @Field(type => MiniStorePriceList)
    @ManyToOne(() => MiniStorePriceList, (storePriceList) => storePriceList.storeProducts)
    storePriceList: MiniStorePriceList;

    @Field(type => MiniStoreClassification)
    @ManyToOne(() => MiniStoreClassification, (storeClassification) => storeClassification.storeProducts)
    storeClassification: MiniStoreClassification;

    @Field(type => InvoiceKeys)
    @ManyToOne(() => InvoiceKeys, (invoiceKeys) => invoiceKeys.storeProducts)
    storeInvoiceKey: InvoiceKeys;

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
