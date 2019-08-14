import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreInvoice } from '../../../mini-store/mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreSale } from '../../../mini-store/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreWarehouseOrder } from '../../../mini-store/mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';

@Entity('usuarios')
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'ap_paterno',
    })
    lastnameFather: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'ap_materno',
    })
    lastnameMother: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'email',
    })
    email: string;

    @Column('varchar', {
        nullable: false,
        name: 'password',
    })
    password: string;

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'remember_token',
    })
    rememberToken: string | null;

    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_departamento',
    })
    idDepartment: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_rol',
    })
    idRole: number;

    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: number;

    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'img',
    })
    img: string | null;

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
    })
    updatedAt: Date;

    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.agentBilling)
    miniStoreBillingInvoices: MiniStoreInvoice[];

    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.agentCanceling)
    miniStoreCancelingInvoices: MiniStoreInvoice[];

    @OneToMany(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.agentBilling)
    miniStoreBillingSales: MiniStoreSale[];

    @OneToMany(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.agentCanceling)
    miniStoreCancelingSales: MiniStoreSale[];

    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.agentBilling)
    miniStoreBillingPayments: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.agentCanceling)
    miniStoreCancelingPayments: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.agentCreator)
    miniStoreCreatorWareHouseOrder: MiniStoreWarehouseOrder[];

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.agentEditor)
    miniStoreEditorWareHouseOrder: MiniStoreWarehouseOrder[];

    @OneToMany(() => Inscription, (inscription) => inscription.agentCreator)
    schoolCreatorInscription: Inscription[];

    @OneToMany(() => Inscription, (inscription) => inscription.agentEditor)
    schoolEditorInscription: Inscription[];
}
