import  { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';
import { Student } from '../../../../school-colegio-ingles/students/entities/student.entity';
import { Cycle } from '../../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MiniStoreQuotation } from '../../mini-store-quotation/entities/mini-store-quotation.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@ObjectType('tie_ventas')
@Entity('tie_ventas')
export class MiniStoreSale extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 40,
    default: () => '\'000000000000000\'',
    name: 'folio',
  })
  folio: string;

  @Field()
  @Column({
    type: 'simple-enum',
    enum: PaymentStatus,
    default: PaymentStatus.Debit,
    nullable: false,
    name: 'id_estado_pago',
  })
  statusSale: PaymentStatus;

  @Field({ nullable: true})
  @Column('text', {
    nullable: true,
    name: 'observaciones',
  })
  observations: string | null;

  @Field({ nullable: true})
  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'fecha_cancelacion',
  })
  dateCancellation: Date | null;

  @Field({ nullable: true})
  @Column('text', {
    nullable: true,
    name: 'motivos_cancelacion',
  })
  reasonCancellation: string | null;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'16\'',
    name: 'iva',
  })
  iva: number;


  @Field(() => BranchOffice)
  @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStore)
  @JoinColumn({
    name: 'storeBranchOfficeId',
    referencedColumnName: 'id',
  })
  storeBranchOffice: BranchOffice;

  @Field((type) => BranchOfficeSetting)
  @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSetStore)
  storeBranchOfficeSet: BranchOfficeSetting;

  @Field(type => Cycle)
  @ManyToOne(type => Cycle, (c) => c.sales)
  @JoinColumn({
    name: 'cycleId',
    referencedColumnName: 'id',
  })
  cycle: Cycle;

  @Field(type => Student)
  @ManyToOne(type => Student, student => student.sales)
  @JoinColumn({
    name: 'id_alumno',
    referencedColumnName: 'id',
  })
  student: Student;

  @Field(type => [MiniStoreSalePayment])
  @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreSale,
    {
      cascade: ['insert'],
    })
  miniStoreSalePayments: MiniStoreSalePayment[];

  @Field(type => [MiniStoreSaleDetail])
  @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreSale,
    {
      cascade: ['insert', 'update'],
    })
  miniStoreSaleDetails: MiniStoreSaleDetail[];

  @Field(type => [MiniStoreInvoice])
  @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.miniStoreSale,
    {
      cascade: ['insert'],
    })
  miniStoreInvoices: MiniStoreInvoice[];

  @Field(type => User)
  @ManyToOne(() => User, (user) => user.miniStoreBillingSales)
  agentBilling: User;

  @Field(type => User)
  @ManyToOne(() => User, (user) => user.miniStoreCancelingSales)
  agentCanceling: User;

  @Field(type => [SalesReturns])
  @OneToMany(type => SalesReturns, returnedProducts => returnedProducts.sale,
    {
      cascade: ['insert'],
    })
  returnedProducts: SalesReturns[];

  @Field(type => User)
  @ManyToOne(type => User, (u) => u.sales)
  @JoinColumn({
    name: 'id_agente',
    referencedColumnName: 'id',
  })
  cashier: User;

  @Field(type => MiniStoreQuotation)
  @OneToOne(type => MiniStoreQuotation, quotation => quotation.quotation, {
    cascade: ['insert', 'update'],
  })
  quotation: MiniStoreQuotation;

  @Field(type => MiniStoreQuotation)
  @OneToOne(type => MiniStoreQuotation, quotation => quotation.sale, {
    cascade: ['insert', 'update'],
  })
  sale: MiniStoreQuotation;


  @Field(type => Int)
  @Column('int', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'isComplete',
  })
  isComplete: number;

  @Field()
  @Column('timestamp', {
    nullable: true,
  })
  expiredAt: Date;

  /**
   * @Deprecated
   */
  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_agente_cancelacion',
  })
  idAgentCancellation: number;

  /**
   * Deprecated
   */
  @Field(type => Int)
  @Column('tinyint', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_iva',
  })
  isIVA: boolean;

  @Field(type => Int)
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
  @Field(type => Int)
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
  @Field(type => Int)
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'timbrado',
  })
  stamping: boolean;

  /**
   * Deprecated
   */
  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_factura',
  })
  idInvoice: number;

  /**
   * @Deprecated
   */
  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_modalidad',
  })
  idModality: number;

  /**
   * @Deprecated
   */
  @Field(type => Int, { nullable: true})
  @Column('int', {
    nullable: true,
    name: 'id_metodo_pago',
  })
  idPaymentMethod: number | null;

  /**
   * Deprecated
   */
  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'codigo_metodo_pago',
  })
  codePaymentMethod: string | null;

  /**
   * @Deprecated
   */
  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    length: 5,
    default: () => '\'0\'',
    name: 'codigo_forma_pago',
  })
  codeWayToPay: string | null;
}
