import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('municipio')
@Index('estado_id', ['stateId'])
export class Municipalities {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id_municipio',
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'estado_id',
  })
  stateId: number;

  @Column('varchar', {
    nullable: false,
    length: 3,
    name: 'clave',
  })
  key: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'nombre',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 4,
    name: 'sigla',
  })
  abbreviations: string;

  @Column('varchar', {
    nullable: true,
    length: 2,
    name: 'status',
  })
  isActive: string | null;

}
