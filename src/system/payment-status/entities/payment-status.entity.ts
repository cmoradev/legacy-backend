import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('estado_pagos')
export class PaymentStatusEntity extends Base {
  @Field()
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'nombre',
  })
  name: string;

}
