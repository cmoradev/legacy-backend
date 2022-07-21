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
import { CreditNoteStore } from '../../../../credit-note-store/entities/credit-note-store.entity';
import { InvoiceGlobalEnum } from '../../../../common/enums/InvoiceGlobal.enum';

@Entity('tie_facturas')
export class MiniStoreInvoice extends Base {
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceGlobalEnum.IS_NOT_GLOBAL,
        enum: InvoiceGlobalEnum,
    })
    isGlobal: InvoiceGlobalEnum;

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

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
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

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    cancellationDate: Date | null;

    @Column('text', {
        nullable: true,
        name: 'motivo_cancelacion',
    })
    reasonCancellation: string | null;


    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_venta',
    })
    idSale: number;


    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_pago',
    })
    idPayment: number;

    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceStatus.Unbilled,
        enum: InvoiceStatus,
        name: 'status',
    })
    status: InvoiceStatus;

    @Column({
        nullable: true,
        name: 'motivo',
    })
    motivo: string | null;

    @Column({
        nullable: true,
        name: 'folioSustitucion',
    })
    folioSustitucion: string | null;

    /**
     * Relación que corresponde al la factura al pago de una venta
     */

    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStoreInvoice)
    @JoinColumn({
        name: 'invoiceBranchOfficeId',
        referencedColumnName: 'id',
    })
    invoiceBranchOffice: BranchOffice;

    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettStoreInvoice)
    invoiceBranchOfficeSet: BranchOfficeSetting;

    @ManyToOne(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreInvoices)
    miniStoreSalePayment: MiniStoreSalePayment;

    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreInvoices)
    miniStoreSale: MiniStoreSale;

    @ManyToOne(() => User, (user) => user.miniStoreBillingInvoices)
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.miniStoreCancelingInvoices)
    agentCanceling: User;

    @ManyToOne(type => SalesReturns, salesReturns => salesReturns.invoices)
    saleReturn: SalesReturns;

    @ManyToOne(() => CreditNoteStore, (creditNoteStore) => creditNoteStore.invoiceStore, { nullable: true })
    creditNoteStore: CreditNoteStore;
}
