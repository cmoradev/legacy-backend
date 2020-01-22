import {
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../system/users/entities/user.entity';
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';

@Entity('tie_ventas')
export class MiniStoreSale {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 40,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @ManyToOne(type => User, (u) => u.sales)
    @JoinColumn({
        name: 'id_agente',
        referencedColumnName: 'id',
    })
    agent: User;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente',
    })
    idAgent: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_modalidad',
    })
    idModality: number;

    @ManyToOne(type => Student, student => student.sales)
    @JoinColumn({
        name: 'id_alumno',
        referencedColumnName: 'id',
    })
    student: Student;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_externo',
    })
    idExternal: number;

    /**
     * Deprecated
     */
    @Column('int', {
        nullable: true,
        name: 'id_metodo_pago',
    })
    idPaymentMethod: number | null;

    /**
     * Deprecated
     */
    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'codigo_metodo_pago',
    })
    codePaymentMethod: string | null;

    @Column('varchar', {
        nullable: true,
        length: 5,
        default: () => '\'0\'',
        name: 'codigo_forma_pago',
    })
    codeWayToPay: string | null;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_estado_pago',
    })
    idStatusPayment: number;

    @Column('text', {
        nullable: true,
        name: 'observaciones',
    })
    observations: string | null;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_agente_cancelacion',
    })
    idAgentCancellation: number;

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

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'ciclo',
    })
    cycle: number;

    @Column('int', {
        nullable: false,
        default: () => '\'16\'',
        name: 'iva',
    })
    iva: number;
    @Column('tinyint', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIVA: boolean;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'is_pagos_diferido',
    })
    isDeferredPayments: boolean;

    @Column('float', {
        nullable: false,
        default: () => '\'0\'',
        name: 'cambio',
    })
    change: number;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'timbrado',
    })
    stamping: boolean;

    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'uuid',
    })
    uuid: string | null;

    /**
     * Deprecated
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_factura',
    })
    idInvoice: number;

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

    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreSale)
    miniStoreSalePayments: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreSale)
    miniStoreSaleDetails: MiniStoreSaleDetail[];

    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.miniStoreSale)
    miniStoreInvoices: MiniStoreInvoice[];

    @ManyToOne(() => User, (user) => user.miniStoreBillingSales)
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.miniStoreCancelingSales)
    agentCanceling: User;

    @OneToMany(type => SalesReturns, returnedProducts => returnedProducts.sale)
    returnedProducts: SalesReturns[];

}
