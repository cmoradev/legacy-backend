import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { InvoiceType } from '../enums/invoice-type.enum';
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceStatus } from '../../../../invoice/types/invoice-status';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('tie_facturas')
export class MiniStoreInvoice extends Base {

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        name: 'folio',
    })
    folio: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'uuid',
    })
    uuid: string;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'razon_social',
    })
    businessName: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'rfc',
    })
    rfc: string | null;

    @Field(typev => Int,{ nullable: true})
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'total',
    })
    total: number | null;

    @Field(typev => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_facturador',
    })
    idBillingAgent: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_cancelador',
    })
    idCancelingAgent: number;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    cancellationDate: Date | null;

    @Field({ nullable: true})
    @Column('text', {
        nullable: true,
        name: 'motivo_cancelacion',
    })
    reasonCancellation: string | null;

    /**
     * Deprecated
     */
    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_venta',
    })
    idSale: number;

    /**
     * Current Relation
     */
    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_pago',
    })
    idPayment: number;

    @Field(type => InvoiceType)
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Field(type => InvoiceStatus)
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceStatus.Unbilled,
        enum: InvoiceStatus,
        name: 'status',
    })
    status: InvoiceStatus;

    /**
     * Relación que corresponde al la factura al pago de una venta
     */

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStoreInvoice)
    @JoinColumn({
        name: 'invoiceBranchOfficeId',
        referencedColumnName: 'id',
    })
    invoiceBranchOffice: BranchOffice;

    @Field(type => BranchOfficeSetting)
    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettStoreInvoice)
    invoiceBranchOfficeSet: BranchOfficeSetting;

    @Field(type => MiniStoreSalePayment)
    @ManyToOne(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreInvoices)
    miniStoreSalePayment: MiniStoreSalePayment;

    @Field(type => MiniStoreSale)
    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreInvoices)
    miniStoreSale: MiniStoreSale;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreBillingInvoices)
    agentBilling: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreCancelingInvoices)
    agentCanceling: User;

    @Field(type => SalesReturns)
    @ManyToOne(type => SalesReturns, salesReturns => salesReturns.invoices)
    saleReturn: SalesReturns;
}
