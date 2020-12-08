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
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('estado_pagos')
export class PaymentStatusEntity extends Base {
  
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'nombre',
  })
  name: string;

}
