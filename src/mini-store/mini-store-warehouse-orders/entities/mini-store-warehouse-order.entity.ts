import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MiniStoreWarehouseOrderProduct } from '../../mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import { MiniStoreWarehouseProvider } from '../../mini-store-warehouse-providers/entities/mini-store-warehouse-provider.entity';
import { User } from '../../../system/users/entities/user.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CashRegisterTransactionType } from '../../cash-register-transactions/enums/cash-register-transaction-type.enum';

@ObjectType()
@Entity('tie_almacen_pedidos')
export class MiniStoreWarehouseOrder extends Base {

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 30,
        name: 'folio',
    })
    folio: string | null;

    @Field()
    @Column( {
      type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_pedido',
    })
    orderDate: Date;

    @Field()
    @Column( {
      type: 'timestamp',
      nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_prevista',
    })
    expectedDate: Date;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'status',
    })
    status: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'neto_solicitud',
    })
    requestNet: number;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'neto_recibido',
    })
    receivedNet: string | null;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIVA: number;

    @Field(type => [MiniStoreWarehouseOrderProduct])
    @OneToMany(() => MiniStoreWarehouseOrderProduct, (OrderProduct) => OrderProduct.miniStoreWarehouseOrder,
        {
            cascade: ['insert', 'update'],
        })
    miniStoreWareHouseOrdersProducts: MiniStoreWarehouseOrderProduct[];

    @Field(type => MiniStoreWarehouseProvider)
    @ManyToOne(() => MiniStoreWarehouseProvider, (miniStoreWarehouseProvider) => miniStoreWarehouseProvider.miniStoreWarehouseOrders)
    miniStoreWarehouseProvider: MiniStoreWarehouseProvider;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreCreatorWareHouseOrder)
    agentCreator: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreEditorWareHouseOrder)
    agentEditor: User;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.id,
        {
            cascade: ['insert', 'update'],
        })
    branchOfficeMiniStoreWherehouse: BranchOffice;
}
