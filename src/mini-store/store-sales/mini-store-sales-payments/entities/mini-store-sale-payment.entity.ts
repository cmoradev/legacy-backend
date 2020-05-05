import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSaleMethodPayment } from '../../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { StatusPayment } from '../../../../common/enums/statusPayment';
import { CashRegisterTransaction } from '../../../cash-register-transactions/entities/cash-register-transaction.entity';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('tie_venta_pagos')
export class MiniStoreSalePayment extends Base {

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
        type: 'enum',
        enum: StatusPayment,
        default: StatusPayment.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    idStatusPayment: StatusPayment;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'id_agente_cancelacion',
    })
    idAgentCancellation: number | null;

    @Column('timestamp', {
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
        type: 'enum',
        enum: StatusPayment,
        default: StatusPayment.Debit,
        nullable: false,
        name: 'systemPaymentStatusId',
    })
    paymentStatus: StatusPayment;

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

    @OneToMany(type => CashRegisterTransaction, (cashRegisterTransaction) => cashRegisterTransaction.payment)
    cashRegisterTransactions: CashRegisterTransaction[];

}
