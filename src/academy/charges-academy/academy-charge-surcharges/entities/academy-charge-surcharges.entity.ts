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

@Entity('ac_cobro_det_recargos')
export class AcademyChargeSurcharges {

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
  nombre: string;

  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  porcentaje: number;

  @Column('int', {
    nullable: false,
    name: 'id_ac_recargo',
  })
  idAcRecargo: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_ac_concepto',
  })
  idAcConcepto: number;

  @Column('int', {
    nullable: false,
    name: 'id_cobro_detalle',
  })
  idCobroDetalle: number;

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

}
