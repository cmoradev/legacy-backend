import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiniStoreSalePayment } from '../../../mini-store/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { AcademyInscriptionConcepts } from '../../../academy/academy-inscription-concepts/entities/academy-inscription-concepts.entity';

@Entity('estado_pagos')
export class SystemPaymentStatus {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'nombre',
  })
  name: string;

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

  @OneToMany(() => MiniStoreSalePayment, (miniStorePayment) => miniStorePayment.systemPaymentStatus)
  miniStoreSalePayments: MiniStoreSalePayment[];

  @OneToMany(() => AcademyInscriptionConcepts, (acInscripConceptos) => acInscripConceptos.acInsConStatusPayment)
  sysPayStaAcInsConcept: AcademyInscriptionConcepts[];
}
