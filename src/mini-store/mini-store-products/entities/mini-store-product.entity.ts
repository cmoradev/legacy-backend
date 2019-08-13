import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStorePriceList} from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import {MiniStoreClassification} from '../../mini-store-classifications/entities/mini-store-classification.entity';
import {MiniStoreInvoiceKey} from '../../mini-store-invoices-keys/entities/mini-store-invoice-key.entity';
import {MiniStoreWarehouseOrderProduct} from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import {MiniStoreSaleDetail} from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';

@Entity('tie_productos')
export class MiniStoreProduct {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

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
        length: 11,
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

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'stock',
    })
    stock: number;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'minstock',
    })
    minStock: number | null;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'maxstock',
    })
    maxStock: number | null;

    @Column('varchar', {
        nullable: false,
        length: 20,
        default: () => '\'Peiza\'',
        name: 'unidad',
    })
    unity: string;

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
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @ManyToOne(() => MiniStorePriceList, (storePriceList) => storePriceList.storeProducts)
    storePriceList: MiniStorePriceList;

    @ManyToOne(() => MiniStoreClassification, (storeClassification) => storeClassification.storeProducts)
    storeClassification: MiniStoreClassification;

    @ManyToOne(() => MiniStoreInvoiceKey, (storeInvoiceKey) => storeInvoiceKey.storeProducts)
    storeInvoiceKey: MiniStoreInvoiceKey;

    @OneToMany(() => MiniStoreWarehouseOrderProduct, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreProduct)
    miniStoreWarehouseOrdersProducts: MiniStoreWarehouseOrderProduct[];

    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreProduct)
    miniStoreSaleDetails: MiniStoreSaleDetail[];

}
