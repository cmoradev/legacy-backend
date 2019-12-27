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

@Entity('ac_cobros')
export class AcademyCharge {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 40,
    default: () => '\'000000000000000\'',
    name: 'folio',
  })
  folio: string;

  @Column('int', {
    nullable: false,
    name: 'id_agente',
  })
  idAgente: number;

  @Column('int', {
    nullable: false,
    name: 'id_modalidad',
  })
  idModalidad: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_alumno',
  })
  idAlumno: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_externo',
  })
  idExterno: number;

  @Column('int', {
    nullable: true,
    name: 'id_metodo_pago',
  })
  idMetodoPago: number | null;

  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'codigo_metodo_pago',
  })
  codigoMetodoPago: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'nombre_metodo_pago',
  })
  nombreMetodoPago: string | null;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_estado_pago',
  })
  idEstadoPago: number;

  @Column('text', {
    nullable: true,
    name: 'observaciones',
  })
  observaciones: string | null;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_agente_cancelacion',
  })
  idAgenteCancelacion: number;

  @Column('timestamp', {
    nullable: true,
    name: 'fecha_cancelacion',
  })
  fechaCancelacion: Date | null;

  @Column('text', {
    nullable: true,
    name: 'motivos_cancelacion',
  })
  motivosCancelacion: string | null;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'ciclo',
  })
  ciclo: number;

  @Column('int', {
    nullable: false,
    name: 'iva',
  })
  iva: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_iva',
  })
  isIva: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_isr',
  })
  isIsr: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'is_ivaretencion',
  })
  isIvaretencion: number;

  @Column('float', {
    nullable: false,
    default: () => '\'0\'',
    name: 'cambio',
  })
  cambio: number;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'timbrado',
  })
  timbrado: boolean;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_plantel',
  })
  idPlantel: number;

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
