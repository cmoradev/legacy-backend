import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {MiniStoreSalePayment} from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { User } from 'src/school-colegio-ingles/users/entities/user.entity';

@Entity('tie_facturas')
export class MiniStoreInvoice {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        name: 'folio',
    })
    folio: string | null;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'uuid',
    })
    uuid: string;

    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'razon_social',
    })
    businessName: string | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'rfc',
    })
    rfc: string | null;

    @Column('float', {
        nullable: true,
        name: 'total',
    })
    total: number | null;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_facturador',
    })
    idBillingAgent: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_cancelador',
    })
    idCancelingAgent: number;

    @Column('timestamp', {
        nullable: true,
        name: 'fecha_cancelacion',
    })
    cancellationDate: Date | null;

    @Column('text', {
        nullable: true,
        name: 'motivo_cancelacion',
    })
    reasonCancellation: string | null;

    /**
     * Deprecated
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_venta',
    })
    idSale: number;

    /**
     * Current Relation
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_pago',
    })
    idPayment: number;

    @Column('tinyint', {
        nullable: false,
        default: () => '\'1\'',
        name: 'status',
    })
    status: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_plantel',
    })
    idPlantel: number;

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

    /**
     * Relación que corresponde al la factura al pago de una venta
     */
    @ManyToOne(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreInvoices)
    miniStoreSalePayment: MiniStoreSalePayment;

    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreInvoices )
    miniStoreSale: MiniStoreSale;

    @ManyToOne(() => User, (user) => user.miniStoreBillingInvoices)
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.miniStoreCancelingInvoices)
    agentCanceling: User;
}
