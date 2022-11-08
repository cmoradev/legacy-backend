import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { Student } from '../../../../school-colegio-ingles/students/entities/student.entity';
import { Cycle } from '../../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Transaction } from '../../../../system/transaction/entities/transaction.entity';
// eliminar al cambiar los reporte del front
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';

@Entity('tie_ventas')
export class MiniStoreSale extends Base {
  @Column('varchar', {
    nullable: false,
    length: 40,
    default: () => '\'000000000000000\'',
    name: 'folio',
  })
  folio: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'quoteName',
  })
  quoteName: string;

  @Column({
    type: 'simple-enum',
    enum: PaymentStatus,
    default: PaymentStatus.Debit,
    nullable: false,
    name: 'id_estado_pago',
  })
  statusSale: PaymentStatus;

  @Column('text', {
    nullable: true,
    name: 'observaciones',
  })
  observations: string | null;

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

  @Column('int', {
    nullable: false,
    default: () => '\'16\'',
    name: 'iva',
  })
  iva: number;


  @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStore)
  @JoinColumn({
    name: 'storeBranchOfficeId',
    referencedColumnName: 'id',
  })
  storeBranchOffice: BranchOffice;

  @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSetStore)
  storeBranchOfficeSet: BranchOfficeSetting;

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

  @ManyToOne(type => User, (u) => u.sales)
  @JoinColumn({
    name: 'id_agente',
    referencedColumnName: 'id',
  })
  cashier: User;

  @Column('int', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'isComplete',
  })
  isComplete: number;

  @Column('timestamp', {
    nullable: true,
  })
  expiredAt: Date;


  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_agente_cancelacion',
  })
  idAgentCancellation: number;


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


  @Column('decimal', {
    nullable: false,
    default: () => '0.000000',
    precision: 15,
    scale: 6,
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


  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_factura',
  })
  idInvoice: number;


  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_modalidad',
  })
  idModality: number;


  @Column('int', {
    nullable: true,
    name: 'id_metodo_pago',
  })
  idPaymentMethod: number | null;


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

  @OneToMany(() => Transaction, (transaction) => transaction.sale)
  transactions: Transaction[];

  @OneToMany(type => SalesReturns, returnedProducts => returnedProducts.sale,
    {
      cascade: ['insert'],
    })
  returnedProducts: SalesReturns[];
}
