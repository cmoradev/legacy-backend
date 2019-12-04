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
import { States } from '../../../system/states/entities/states.entity';
import { SystemConceptsType } from '../../../system/system-concepts-type/entities/system-concepts-type.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { Campus } from '../../../school-colegio-ingles/campuses/entities/campus.entity';
import { Level } from '../../../school-colegio-ingles/levels/entities/level.entity';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';

@Entity('ac_aconceptos')
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

  @ManyToOne(type => Cycle, cycle => cycle.cycleAcademyConcepts)
  @JoinColumn({
    name: 'id_ciclo',
    referencedColumnName: 'id',
  })
  academyConceptsCycle: Cycle;

  @ManyToOne(type => Campus, campus => campus.campusAcademyConcepts)
  @JoinColumn({
    name: 'id_plantel',
    referencedColumnName: 'id',
  })
  academyConceptsCampus: Campus;

  @ManyToOne(type => Level, level => level.levelAcademyConcepts)
  @JoinColumn({
    name: 'id_nivel',
    referencedColumnName: 'id',
  })
  academyConceptsLevel: Level;

  @ManyToOne(type => SystemConceptsType, state => state.systemConceptAcademy)
  @JoinColumn({
    name: 'id_tipo_concepto',
    referencedColumnName: 'id',
  })
  academyConceptsType: SystemConceptsType;

  @ManyToOne(type => AcademyActivity, activity => activity.academyActivityConcepts)
  @JoinColumn({
    name: 'id_academia',
    referencedColumnName: 'id',
  })
  academyConceptsActivity: AcademyActivity;

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
