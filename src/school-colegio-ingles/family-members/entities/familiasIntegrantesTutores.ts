import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('familias_integrantes_tutores')
export class FamiliasIntegrantesTutores extends Base {


  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'idfamilia',
  })
  idfamilia: number;


  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'nombre',
  })
  nombre: string;


  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'apellido_pa',
  })
  apellidoPa: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'apellido_ma',
  })
  apellidoMa: string;


  @Field()
  @Column('date', {
    nullable: false,
    name: 'fech_nac',
  })
  fechNac: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'curp',
  })
  curp: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'estado_civil',
  })
  estadoCivil: string;


  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'ocupacion',
  })
  ocupacion: string;


  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'empresa',
  })
  empresa: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'cargo',
  })
  cargo: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 15,
    name: 'celular',
  })
  celular: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 15,
    name: 'celular_ref',
  })
  celularRef: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 15,
    name: 'telefono_oficina',
  })
  telefonoOficina: string;

  @Field(type => Int)
  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'correo',
  })
  correo: string;

  @Field(type => Int)
  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'domiciolio',
  })
  domiciolio: string;

}
