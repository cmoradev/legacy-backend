import {
  BaseEntity,
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';
import { Campus } from '../../../school-colegio-ingles/campuses/entities/campus.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyActivitiesGroup } from '../../academy-activities-group/entities/academy-activities-group.entity';
import { InscriptionStatus } from '../../../system/inscription-status/entities/inscription-status.entity';

@Entity('ac_inscripciones_alumnos')
export class AcademyInscription {
  // agregue realciones aun falta la migracion
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'clave_inscripcion',
  })
  keyInscription: string;

  @ManyToOne(type => AcademyActivity, activity => activity.academyActInscription)
  @JoinColumn({
    name: 'id_academia',
    referencedColumnName: 'id',
  })
  acInsActivity: AcademyActivity;

  @ManyToOne(() => Student, (student) => student.studentAcInscriptions)
  @JoinColumn({
    name: 'id_alumno',
    referencedColumnName: 'id',
  })
  acInsStudent: Student;

  @ManyToOne(() => Campus, (campus) => campus.campusAcIns)
  @JoinColumn({
    name: 'id_plantel',
    referencedColumnName: 'id',
  })
  acInsCampus: Campus;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_nivel',
  })
  idNivel: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_grado',
  })
  idGrado: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_grupo',
  })
  idGrupo: number;

  @ManyToOne(() => AcademyActivitiesGroup, (group) => group.acGroupAcInsc)
  @JoinColumn({
    name: 'id_ac_grupo',
    referencedColumnName: 'id',
  })
  acInsActGroup: AcademyActivitiesGroup;

  @ManyToOne(() => User, (user) => user.userAcInsHigh)
  @JoinColumn({
    name: 'id_agente',
    referencedColumnName: 'id',
  })
  acInsAgentCreator: User;

  @Column('varchar', {
    nullable: true,
    length: 250,
    name: 'descripcion',
  })
  description: string | null;

  @Column('varchar', {
    nullable: true,
    length: 230,
    name: 'dias',
  })
  days: string | null;

  @Column('varchar', {
    nullable: true,
    length: 230,
    name: 'horario',
  })
  timetable: string | null;

  @Column('date', {
    nullable: true,
    name: 'fecha_inicio',
  })
  startDate: string | null;

  @Column('date', {
    nullable: true,
    name: 'fecha_fin',
  })
  startEnd: string | null;

  @ManyToOne(() => User, (user) => user.userAcInsDown)
  @JoinColumn({
    name: 'id_agente_baja',
    referencedColumnName: 'id',
  })
  acInsAgentDown: User | null;

  @Column('timestamp', {
    nullable: true,
    name: 'fecha_baja',
  })
  downDate: Date | null;

  @Column('varchar', {
    nullable: true,
    name: 'motivo_baja',
  })
  downMotive: string | null;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'incluida',
  })
  isIncluded: boolean;

  @ManyToOne(() => InscriptionStatus, (inscriptionStatus) => inscriptionStatus.insStatusAcIns)
  @JoinColumn({
    name: 'id_estado_inscripcion',
    referencedColumnName: 'id',
  })
  acInsStatusIns: InscriptionStatus;

  @ManyToOne(() => Cycle, (cycle) => cycle.cycleAcIns)
  @JoinColumn({
    name: 'id_ciclo',
    referencedColumnName: 'id',
  })
  acInsCycle: Cycle;

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
