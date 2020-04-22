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
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { Shift } from '../../../system/shift/entities/shift.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { Campus } from '../../../school-colegio-ingles/campuses/entities/campus.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';

@Entity('ac_grupos')
export class AcademyActivitiesGroup {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'nombre',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 250,
    name: 'horario',
  })
  schedule: string;

  @Column('int', {
    nullable: true,
    default: () => '\'0\'',
    name: 'id_maestro',
  })
  idMaestro: number | null;

  @ManyToOne(type => Shift, shift => shift.shiftActivityGroups)
  @JoinColumn({
    name: 'id_turno',
    referencedColumnName: 'id',
  })
  academyGroupShift: Shift;

  @ManyToOne(type => AcademyActivity, activity => activity.academyActivityGroups)
  @JoinColumn({
    name: 'id_academia',
    referencedColumnName: 'id',
  })
  academyGroupActivity: AcademyActivity;

  @Column('int', {
    nullable: true,
    name: 'min',
  })
  min: number | null;

  @Column('int', {
    nullable: false,
    default: () => '\'20\'',
    name: 'max',
  })
  max: number;

  @ManyToOne(type => Cycle, cycle => cycle.cycleAcademyGroups)
  @JoinColumn({
    name: 'id_ciclo',
    referencedColumnName: 'id',
  })
  academyGroupCycle: Cycle;

  @ManyToOne(type => Campus, campus => campus.campusAcademyGroups)
  @JoinColumn({
    name: 'id_plantel',
    referencedColumnName: 'id',
  })
  academyGroupCampus: Campus;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'activo',
  })
  isActive: number;

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

  @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.academyGroup)
  acGroupAcInsc: AcademyInscription[];

}
