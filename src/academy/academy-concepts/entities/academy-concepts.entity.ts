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

@Entity('ac_aconceptos', { schema: 'colegio_pdc' })
export class AcademyConcepts {

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

  @Column('varchar', {
    nullable: true,
    name: 'descripcion',
  })
  description: string | null;

  @Column('float', {
    nullable: false,
    default: () => '\'0\'',
    name: 'precio',
  })
  price: number;

  @Column('varchar', {
    nullable: true,
    length: 70,
    name: 'codigo_producto',
  })
  productCode: string | null;

  @Column('varchar', {
    nullable: true,
    length: 20,
    name: 'codigo_unidad',
  })
  unitCode: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'unidad',
  })
  unity: string | null;

  @Column('int', {
    nullable: false,
    name: 'id_ciclo',
  })
  idCycle: number;

  @Column('int', {
    nullable: false,
    name: 'id_plantel',
  })
  idCampus: number;

  @Column('int', {
    nullable: true,
    default: () => '\'0\'',
    name: 'id_nivel',
  })
  idLevel: number | null;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_tipo_concepto',
  })
  idTipoConcepto: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_academia',
  })
  idAcademy: number;

  @Column('int', {
    nullable: true,
    default: () => '\'1\'',
    name: 'escolar',
  })
  school: number | null;

  @Column('tinyint', {
    nullable: true,
    width: 1,
    default: () => '\'0\'',
    name: 'externos',
  })
  external: boolean | null;

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

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'1\'',
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
