import { Column, Entity, ManyToOne } from 'typeorm';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreWarehouseOrder } from '../../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('tie_almacen_pedidos_productos')
export class MiniStoreWarehouseOrderProduct extends Base {

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'cantidad_solicitada',
    })
    requestedAmount: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        name: 'precio_proveedor_solicitud',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    providerPriceRequest: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        name: 'precio_proveedor_recibido',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    providerPriceReceived: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        name: 'neto_solicitud',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    netRequest: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'cantidad_recibida',
    })
    receivedAmount: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        name: 'neto_recibido',
        precision: 15,
        scale: 2,
        default: () => '\'0.00\'',
    })
    netReceived: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'sutirdostatus',
    })
    assortedStatus: number | null;

    @Field(type => MiniStoreProduct)
    @ManyToOne(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.miniStoreWarehouseOrdersProducts)
    miniStoreProduct: MiniStoreProduct;

    @Field(type => MiniStoreWarehouseOrder)
    @ManyToOne(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreWareHouseOrdersProducts)
    miniStoreWarehouseOrder: MiniStoreWarehouseOrder;

}
