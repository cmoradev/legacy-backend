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

@Entity('ac_descuentos')
export class SystemExtraCharges {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 300,
    name: 'nombre',
  })
  name: string;

  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  percentage: number;

  @Column('tinyint', {
    nullable: true,
    name: 'dia_inicio',
  })
  startDay: number | null;

  @Column('tinyint', {
    nullable: true,
    name: 'dia_fin',
  })
  endDay: number | null;

  @Column('date', {
    nullable: true,
    name: 'fecha_inicio',
  })
  startDate: string | null;

  @Column('date', {
    nullable: true,
    name: 'fecha_fin',
  })
  endDate: string | null;

  @Column('int', {
    nullable: true,
    name: 'id_formaplicacion',
  })
  idFormaplicacion: number | null;

  @Column('int', {
    nullable: false,
    name: 'id_tipo_descuento',
  })
  idTipoDescuento: number;

  @Column('int', {
    nullable: false,
    name: 'id_plantel',
  })
  idPlantel: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_ciclo',
  })
  idCiclo: number;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    name: 'active',
  })
  isActive: boolean;

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
