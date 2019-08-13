import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStoreProduct} from '../../mini-store-products/entities/mini-store-product.entity';
import {MiniStoreWarehouseOrder} from '../../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';

@Entity('tie_almacen_pedidos_productos')
export class MiniStoreWarehouseOrderProduct {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_pedido',
    })
    idOrder: number;

    @Column('int', {
        nullable: false,
        name: 'id_producto',
    })
    idProduct: number;

    @Column('int', {
        nullable: false,
        name: 'cantidad_solicitada',
    })
    requestedAmount: number;

    @Column('double', {
        nullable: false,
        default: () => '\'0\'',
        name: 'precio_proveedor_solicitud',
    })
    providerPriceRequest: number;

    @Column('double', {
        nullable: false,
        default: () => '\'0\'',
        name: 'precio_proveedor_recibido',
    })
    providerPriceReceived: number;

    @Column('double', {
        nullable: false,
        name: 'neto_solicitud',
    })
    netRequest: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'cantidad_recibida',
    })
    receivedAmount: number;

    @Column('double', {
        nullable: false,
        default: () => '\'0\'',
        name: 'neto_recibido',
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
