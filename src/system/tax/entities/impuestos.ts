import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('impuestos')
export class Impuestos extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'nombre',
  })
  nombre: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'codigo',
  })
  codigo: string;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  porcentaje: number;

}
