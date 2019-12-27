import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { SystemPaymentStatus } from '../../../system/system-payments-status/entities/system-payment-status.entity';
import { SystemConceptsType } from '../../../system/system-concepts-type/entities/system-concepts-type.entity';
import { MiniStoreSale } from '../../../mini-store/mini-store-sales/entities/mini-store-sale.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';

@Entity('ac_inscrip_conceptos')
export class AcademyInscriptionConcepts {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: true,
    length: 200,
    name: 'clave_inscripcion',
  })
  keyInscription: string | null;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'codigo_producto',
  })
  productCode: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'codigo_unidad',
  })
  unitCode: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'unidad',
  })
  unit: string | null;

  @ManyToOne(type => AcademyActivity, activity => activity.academyActAcInsConcept)
  @JoinColumn({
    name: 'id_academia',
    referencedColumnName: 'id',
  })
  acInsConActivity: AcademyActivity;

  @ManyToOne(type => SystemConceptsType, sysConType => sysConType.systemConceptAcInsConcept)
  @JoinColumn({
    name: 'id_concepto_cobro',
    referencedColumnName: 'id',
  })
  acInsConConcepType: SystemConceptsType;

  @ManyToOne(type => SystemPaymentStatus, systemPayStatus => systemPayStatus.sysPayStaAcInsConcept)
  @JoinColumn({
    name: 'id_estado_pago',
    referencedColumnName: 'id',
  })
  acInsConStatusPayment: SystemPaymentStatus;

  @Column('varchar', {
    nullable: true,
    length: 250,
    name: 'descripcion',
  })
  description: string | null;

  @Column('int', {
    nullable: false,
    default: () => '\'1\'',
    name: 'cantidad',
  })
  quantity: number;

  @Column('date', {
    nullable: true,
    name: 'fecha_pago',
  })
  payDay: string | null;

  @Column('date', {
    nullable: true,
    name: 'fecha_pagado',
  })
  datePay: string | null;

  @Column('float', {
    nullable: false,
    default: () => '\'0\'',
    name: 'precio',
  })
  price: number;

  @Column('float', {
    nullable: true,
    name: 'oldprecio',
  })
  oldPrice: number | null;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_ac_cobro',
  })
  idAcCobro: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_iva',
  })
  isIva: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_isr',
  })
  isIsr: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_ivaretencion',
  })
  isIvaretencion: number;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'1\'',
    name: 'active',
  })
  isActive: boolean;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => AcademyInscription, (AcInscription) => AcInscription.acInsConcepts)
  AcInscription: AcademyInscription;

}
