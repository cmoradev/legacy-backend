import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreWarehouseOrder } from '../../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';

@Entity('tie_almacen_pedidos_productos')
export class MiniStoreWarehouseOrderProduct {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'cantidad_solicitada',
    })
    requestedAmount: number;

    @Column('decimal', {
        nullable: false,
        name: 'precio_proveedor_solicitud',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    providerPriceRequest: number;

    @Column('decimal', {
        nullable: false,
        name: 'precio_proveedor_recibido',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    providerPriceReceived: number;

    @Column('decimal', {
        nullable: false,
        name: 'neto_solicitud',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    netRequest: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'cantidad_recibida',
    })
    receivedAmount: number;

    @Column('decimal', {
        nullable: false,
        name: 'neto_recibido',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    netReceived: number;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'sutirdostatus',
    })
    assortedStatus: number | null;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.miniStoreWarehouseOrdersProducts)
    miniStoreProduct: MiniStoreProduct;

    @ManyToOne(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreWareHouseOrdersProducts)
    miniStoreWarehouseOrder: MiniStoreWarehouseOrder;

}
