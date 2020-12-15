import { Column, Entity, ManyToOne, OneToMany, ValueTransformer } from 'typeorm';
import { MiniStorePriceList } from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreClassification } from '../../mini-store-classifications/entities/mini-store-classification.entity';
import { MiniStoreWarehouseOrderProduct } from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import { MiniStoreSaleDetail } from '../../store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { InvoiceKeys } from '../../../invoice/invoice-keys/entities/invoice-keys.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';
import { Base } from '../../../common/orm/entities/base.entity';

export const toJsonCal: ValueTransformer = {

    to(value: string): string {
        return value;
    },
    from(value: string): any {
        try {
            return JSON.parse(value);
        } catch (e) {
            console.log(e.message);
            return [];
        }
    },

};

@Entity('tie_productos')
export class MiniStoreProduct extends Base {

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'descripcion',
    })
    description: string;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'codigo',
    })
    code: string;

    @Column('varchar', {
        nullable: true,
        length: 25,
        name: 'codigo_barra',
    })
    codeBar: string | null;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'activo',
    })
    isActive: boolean;

    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio_con_iva',
    })
    priceWithIVA: string;

    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio_proveedor',
    })
    priceProvider: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'iva',
    })
    IVA: boolean;

    @Column('tinyint', {
        nullable: false,
        width: 1,
    })
    isFavorite: boolean;

    @Column('text', {
        nullable: true,
    })
    picture: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000\'',
        precision: 15,
        scale: 3,
        name: 'stock',
    })
    stock: number;

    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000\'',
        precision: 15,
        scale: 3,
        name: 'minstock',
    })
    minStock: number | null;

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
    @Column('varchar', {
        nullable: false,
        length: 20,
        default: () => '\'Pieza\'',
        name: 'unidad',
    })
    unity: string;

    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
    })
    unitMeasurement: number;

    // '[{\"value\":0,\"leftOperation\":[],\"rightOperation\":[],\"type\":1,\"position\":1}]'
    @Column({
        type: 'longtext',
        nullable: true,
        transformer: toJsonCal,
    })
    calculation: string;

    @ManyToOne(() => MiniStorePriceList, (storePriceList) => storePriceList.storeProducts)
    storePriceList: MiniStorePriceList;

    @ManyToOne(() => MiniStoreClassification, (storeClassification) => storeClassification.storeProducts)
    storeClassification: MiniStoreClassification;

    @ManyToOne(() => InvoiceKeys, (invoiceKeys) => invoiceKeys.storeProducts)
    storeInvoiceKey: InvoiceKeys;

    @OneToMany(() => MiniStoreWarehouseOrderProduct, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreProduct)
    miniStoreWarehouseOrdersProducts: MiniStoreWarehouseOrderProduct[];

    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreProduct)
    miniStoreSaleDetails: MiniStoreSaleDetail[];

    @OneToMany(() => MiniStoreProductsProviders, (mStore) => mStore.product,
        {
            cascade: ['insert', 'update'],
        })
    miniStoreProductsProvider: MiniStoreProductsProviders[];

    @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.id,
        {
            cascade: ['insert', 'update'],
        })
    branchOffice: BranchOffice;

}
