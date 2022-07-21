import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSaleMethodPayment } from '../../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { CashRegisterTransaction } from '../../../cash-register-transactions/entities/cash-register-transaction.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';

@Entity('tie_venta_pagos')
export class MiniStoreSalePayment extends Base {
    @Column('varchar', {nullable: true})
    globalUuid: string;

    @Column('varchar', {
        nullable: false,
        length: 45,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cambio',
    })
    change: number | null;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cantidad',
    })
    quantity: number;

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
     * Deprecated
     */
    @Column({
        type: 'simple-enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    idStatusPayment: PaymentStatus;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'id_agente_cancelacion',
    })
    idAgentCancellation: number | null;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    dateCancellation: Date | null;

    @Column('text', {
        nullable: true,
        name: 'motivos_cancelacion',
    })
    reasonCancellation: string | null;

    @Column('text', {
        nullable: true,
        name: 'observaciones',
    })
    observations: string | null;

    /**
     * Timbrado
     */
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'timbrado',
    })
    stamping: number;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'is_iva',
    })
    isIVA: boolean;

    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStorePayment)
    storePaymentOffice: BranchOffice;

    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettStorePayment)
    storePaymentOfficeSet: BranchOfficeSetting;

    /**
     * Relación de un pago con una venta
     */
    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreSalePayments)
    @JoinColumn({
        name: 'saleId',
        referencedColumnName: 'id',
    })
    miniStoreSale: MiniStoreSale;

    @Column({
        type: 'simple-enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'systemPaymentStatusId',
    })
    paymentStatus: PaymentStatus;

    /**
     * Relación de un pago con sus metodos de pago
     */
    @OneToMany(() => MiniStoreSaleMethodPayment, (miniStoreSaleMethodPayment) => miniStoreSaleMethodPayment.miniStoreSalePayment,
      {
          cascade: ['insert', 'update'],
      })
    miniStoreSaleMethodPayments: MiniStoreSaleMethodPayment[];

    /**
     * Relación Bidireccional del pago de una venta con la Facturas
     */
    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.miniStoreSalePayment)
    miniStoreInvoices: MiniStoreInvoice[];

    @ManyToOne(() => User, (user) => user.miniStoreBillingPayments)
    @JoinColumn({
        name: 'cashierBillingId',
        referencedColumnName: 'id',
    })
    agentBilling: User;

    @ManyToOne(type => User, user => user.salePayments)
    @JoinColumn({
        name: 'recaudadorId',
        referencedColumnName: 'id',
    })
    agent: User;

    @ManyToOne(() => User, (user) => user.miniStoreCancelingPayments)
    @JoinColumn({
        name: 'paymentCancellerId',
        referencedColumnName: 'id',
    })
    agentCanceling: User;

    @OneToMany(type => CashRegisterTransaction, (cashRegisterTransaction) => cashRegisterTransaction.payment, {
        cascade: ['insert', 'update'],
    })
    cashRegisterTransactions: CashRegisterTransaction[];

}
