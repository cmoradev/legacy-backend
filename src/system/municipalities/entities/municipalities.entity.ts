import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('municipio')
@Index('estado_id', ['stateId'])
export class Municipalities {

  @Field(type => ID)
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id_municipio',
  })
  id: number;
  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'estado_id',
  })
  stateId: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 3,
    name: 'clave',
  })
  key: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'nombre',
  })
  name: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 4,
    name: 'sigla',
  })
  abbreviations: string;

  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    length: 2,
    name: 'status',
  })
  isActive: string | null;

}
