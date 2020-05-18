import {
    AfterInsert,
    Column,
    Entity,
    Generated,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';
import { Student } from '../../../../school-colegio-ingles/students/entities/student.entity';
import { Cycle } from '../../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { StatusPayment } from '../../../../common/enums/statusPayment';
import { FixedAssetAssignmentStatus } from '../../../../fixed-assets-control/fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('tie_ventas')
export class MiniStoreSale extends Base {

    @Column('varchar', {
        nullable: false,
        length: 40,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    /**
     * @Deprecated
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_modalidad',
    })
    idModality: number;

    /**
     * @Deprecated
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_externo',
    })
    idExternal: number;

    /**
     * @Deprecated
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

    /**
     * @Deprecated
     */
    @Column('varchar', {
        nullable: true,
        length: 5,
        default: () => '\'0\'',
        name: 'codigo_forma_pago',
    })
    codeWayToPay: string | null;

    @Column({
        type: 'enum',
        enum: StatusPayment,
        default: StatusPayment.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    statusSale: StatusPayment;

    @Column('text', {
        nullable: true,
        name: 'observaciones',
    })
    observations: string | null;

    /**
     * @Deprecated
     */
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
        default: () => '\'16\'',
        name: 'iva',
    })
    iva: number;

    /**
     * Deprecated
     */
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

    /**
     * Deprecated
     */
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cambio',
    })
    change: number;

    /**
     * Deprecated
     */
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'timbrado',
    })
    stamping: boolean;

    @Column()
    @Generated('uuid')
    uuid: string;

    /**
     * Deprecated
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_factura',
    })
    idInvoice: number;

    @ManyToOne(() => BranchOffice, (campus) => campus.campusAcademyCharge)
    @JoinColumn({
        name: 'storeBranchOfficeId',
        referencedColumnName: 'id',
    })
    storeBranchOffice: BranchOffice;

    @ManyToOne(type => Cycle, (c) => c.sales)
    @JoinColumn({
        name: 'cycleId',
        referencedColumnName: 'id',
    })
    cycle: Cycle;

    @ManyToOne(type => Student, student => student.sales)
    @JoinColumn({
        name: 'id_alumno',
        referencedColumnName: 'id',
    })
    student: Student;

    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreSale,
        {
            cascade: ['insert'],
        })
    miniStoreSalePayments: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreSale,
        {
            cascade: ['insert', 'update'],
        })
    miniStoreSaleDetails: MiniStoreSaleDetail[];

    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.miniStoreSale,
        {
            cascade: ['insert'],
        })
    miniStoreInvoices: MiniStoreInvoice[];

    @ManyToOne(() => User, (user) => user.miniStoreBillingSales)
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.miniStoreCancelingSales)
    agentCanceling: User;

    @OneToMany(type => SalesReturns, returnedProducts => returnedProducts.sale,
        {
            cascade: ['insert'],
        })
    returnedProducts: SalesReturns[];

    @ManyToOne(type => User, (u) => u.sales)
    @JoinColumn({
        name: 'id_agente',
        referencedColumnName: 'id',
    })
    cashier: User;

}
