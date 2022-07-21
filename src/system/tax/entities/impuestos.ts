import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('impuestos')
export class Impuestos extends Base {

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'nombre',
  })
  nombre: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'codigo',
  })
  codigo: string;

  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  porcentaje: number;

}
