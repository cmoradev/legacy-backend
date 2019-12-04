import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('facturacion_claves')
export class InvoiceKeys {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 80,
    name: 'clave',
  })
  key: string;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_unidad',
  })
  idUnidad: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_razon_social',
  })
  idRazonSocial: number;

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

}
