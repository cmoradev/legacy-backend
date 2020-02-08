import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStoreWarehouseOrderProduct} from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import {MiniStoreWarehouseProvider} from '../../mini-store-warehouse-providers/entities/mini-store-warehouse-provider.entity';
import { User } from '../../../system/users/entities/user.entity';


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

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
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

    @ManyToOne(() => User, (user) => user.miniStoreCreatorWareHouseOrder)
    agentCreator: User;

    @ManyToOne(() => User, (user) => user.miniStoreEditorWareHouseOrder)
    agentEditor: User;
}
