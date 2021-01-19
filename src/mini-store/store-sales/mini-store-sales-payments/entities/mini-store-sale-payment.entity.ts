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
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('tie_venta_pagos')
export class MiniStoreSalePayment extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @Field(type => Int, { nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cambio',
    })
    change: number | null;

    @Field(type => Int)
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
    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_venta',
    })
    idSale: number;

    /**
     * Deprecated
     */
    @Field(type => PaymentStatus)
    @Column({
        type: 'simple-enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    idStatusPayment: PaymentStatus;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'id_agente_cancelacion',
    })
    idAgentCancellation: number | null;

    @Field({ nullable: true })
    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    dateCancellation: Date | null;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
        name: 'motivos_cancelacion',
    })
    reasonCancellation: string | null;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
        name: 'observaciones',
    })
    observations: string | null;

    /**
     * Timbrado
     */
    @Field(type => Int, { nullable: false })
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'timbrado',
    })
    stamping: number;

    @Field(type => Boolean, { nullable: false })
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'is_iva',
    })
    isIVA: boolean;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStorePayment)
    storePaymentOffice: BranchOffice;

    @Field(type => BranchOfficeSetting)
    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettStorePayment)
    storePaymentOfficeSet: BranchOfficeSetting;

    /**
     * Relación de un pago con una venta
     */
    @Field(type => MiniStoreSale)
    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreSalePayments)
    @JoinColumn({
        name: 'saleId',
        referencedColumnName: 'id',
    })
    miniStoreSale: MiniStoreSale;

    @Field(type => PaymentStatus)
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
    @Field(type => [MiniStoreSaleMethodPayment])
    @OneToMany(() => MiniStoreSaleMethodPayment, (miniStoreSaleMethodPayment) => miniStoreSaleMethodPayment.miniStoreSalePayment,
      {
          cascade: ['insert', 'update'],
      })
    miniStoreSaleMethodPayments: MiniStoreSaleMethodPayment[];

    /**
     * Relación Bidireccional del pago de una venta con la Facturas
     */
    @Field(type => [MiniStoreInvoice])
    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.miniStoreSalePayment)
    miniStoreInvoices: MiniStoreInvoice[];

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreBillingPayments)
    @JoinColumn({
        name: 'cashierBillingId',
        referencedColumnName: 'id',
    })
    agentBilling: User;

    @Field(type => User)
    @ManyToOne(type => User, user => user.salePayments)
    @JoinColumn({
        name: 'recaudadorId',
        referencedColumnName: 'id',
    })
    agent: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreCancelingPayments)
    @JoinColumn({
        name: 'paymentCancellerId',
        referencedColumnName: 'id',
    })
    agentCanceling: User;

    @Field(type => [CashRegisterTransaction])
    @OneToMany(type => CashRegisterTransaction, (cashRegisterTransaction) => cashRegisterTransaction.payment, {
        cascade: ['insert', 'update'],
    })
    cashRegisterTransactions: CashRegisterTransaction[];

}
