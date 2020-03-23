import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStorePriceList} from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import {MiniStoreClassification} from '../../mini-store-classifications/entities/mini-store-classification.entity';
import {MiniStoreWarehouseOrderProduct} from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import {MiniStoreSaleDetail} from '../../store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { InvoiceKeys } from '../../../invoice/invoice-keys/entities/invoice-keys.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';

@Entity('tie_productos')
export class MiniStoreProduct {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id?: number;

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

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_listaprecios',
    })
    idPriceList: number;

    @Column('int', {
        nullable: false,
        name: 'id_clasificacion',
    })
    idClassification: number;

    @Column('int', {
        nullable: false,
        name: 'id_facturacion_codigos',
    })
    idInvoiceKey: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt?: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt?: Date;

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

    @OneToMany(() => MiniStoreProductsProviders, (mStore) => mStore.product)
    miniStoreProductsProvider: MiniStoreProductsProviders[];
}
