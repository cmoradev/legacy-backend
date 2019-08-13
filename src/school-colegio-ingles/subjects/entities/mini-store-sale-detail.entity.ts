import {Column, Entity,  ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {MiniStoreSale} from './mini-store-sale.entity';
import {MiniStoreProduct} from '../../../mini-store/mini-store-products/entities/mini-store-product.entity';
import {MiniStoreClassification} from '../../../mini-store/mini-store-classifications/entities/mini-store-classification.entity';

@Entity('tie_venta_detalle' )
export class MiniStoreSaleDetail {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_producto',
    })
    idProduct: number;

    @Column('int', {
        nullable: false,
        name: 'id_clasificacion',
    })
    idClassification: number;

    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_producto',
    })
    productCode: string;

    @Column('int', {
        nullable: false,
        name: 'cantidad',
    })
    quantity: number;

    @Column('decimal', {
        nullable: false,
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string;

    @Column('int', {
        nullable: false,
        name: 'id_tie_venta',
    })
    idSale: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date | null;

    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreSaleDetails)
    miniStoreSale: MiniStoreSale;

    @ManyToOne(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.miniStoreSaleDetails)
    miniStoreProduct: MiniStoreProduct;

    @ManyToOne(() => MiniStoreClassification, (miniStoreClassification) => miniStoreClassification.miniStoreSaleDetails)
    miniStoreClassification: MiniStoreClassification;
}
