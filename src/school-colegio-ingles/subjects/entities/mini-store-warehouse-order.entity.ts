import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStoreWarehouseOrderProduct} from './mini-store-warehouse-order-product.entity';
import {MiniStoreWarehouseProvider} from './mini-store-warehouse-provider.entity';

@Entity('tie_almacen_pedidos')
export class MiniStoreWarehouseOrder {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        length: 30,
        name: 'folio',
    })
    folio: string | null;

    @Column('int', {
        nullable: false,
        name: 'id_proveedor',
    })
    idProvider: number;

    @Column('date', {
        nullable: true,
        name: 'fecha_pedido',
    })
    orderDate: string | null;

    @Column('date', {
        nullable: true,
        name: 'fecha_prevista',
    })
    expectedDate: string | null;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'status',
    })
    status: boolean;

    @Column('float', {
        nullable: false,
        name: 'neto_solicitud',
    })
    requestNet: number;

    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'neto_recibido',
    })
    receivedNet: string | null;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIVA: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_creador',
    })
    idCreatorAgent: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_editor',
    })
    idEditorAgent: number;

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

    @OneToMany(() => MiniStoreWarehouseOrderProduct, (miniStoreWarehouseOrderProduct) => miniStoreWarehouseOrderProduct.miniStoreWarehouseOrder)
    miniStoreWareHouseOrdersProducts: MiniStoreWarehouseOrderProduct[];

    @ManyToOne(() => MiniStoreWarehouseProvider, (miniStoreWarehouseProvider) => miniStoreWarehouseProvider.miniStoreWarehouseOrders)
    miniStoreWarehouseProvider: MiniStoreWarehouseProvider;
}
