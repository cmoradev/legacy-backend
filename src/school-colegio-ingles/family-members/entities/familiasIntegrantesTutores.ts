import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('familias_integrantes_tutores')
export class FamiliasIntegrantesTutores extends Base {


  @Column('int', {
    nullable: false,
    name: 'idfamilia',
  })
  idfamilia: number;


  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'nombre',
  })
  nombre: string;


  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'apellido_pa',
  })
  apellidoPa: string;

  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'apellido_ma',
  })
  apellidoMa: string;


  @Column('date', {
    nullable: false,
    name: 'fech_nac',
  })
  fechNac: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'curp',
  })
  curp: string;

  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'estado_civil',
  })
  estadoCivil: string;


  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'ocupacion',
  })
  ocupacion: string;


  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'empresa',
  })
  empresa: string;

  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'cargo',
  })
  cargo: string;

  @Column('varchar', {
    nullable: false,
    length: 15,
    name: 'celular',
  })
  celular: string;

  @Column('varchar', {
    nullable: false,
    length: 15,
    name: 'celular_ref',
  })
  celularRef: string;

  @Column('varchar', {
    nullable: false,
    length: 15,
    name: 'telefono_oficina',
  })
  telefonoOficina: string;

  @Column('varchar', {
    nullable: false,
    length: 70,
    name: 'correo',
  })
  correo: string;

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'domiciolio',
  })
  domiciolio: string;

}
