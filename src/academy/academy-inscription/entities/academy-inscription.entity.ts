import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from '../../academy-activities/entities/academy-activity.entity';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyActivitiesGroup } from '../../academy-activities-group/entities/academy-activities-group.entity';
import { AcademyInscriptionConcepts } from '../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { InscriptionStatus } from '../../../common/enums/PaymentStatus';
import { Base } from '../../../common/orm/entities/base.entity';
import { Group } from '../../../school-colegio-ingles/groups/entities/group.entity';
import { Grade } from '../../../school-colegio-ingles/grades/entities/grade.entity';
import { Level } from '../../../school-colegio-ingles/levels/entities/level.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_inscripciones_alumnos')
export class AcademyInscription extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'clave_inscripcion',
  })
  keyInscription: string;

  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    length: 250,
    name: 'descripcion',
  })
  description: string | null;

  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    length: 230,
    name: 'dias',
  })
  days: string | null;

  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    length: 230,
    name: 'horario',
  })
  timetable: string | null;

  @Field({ nullable: true })
  @Column('date', {
    nullable: true,
    name: 'fecha_inicio',
  })
  startDate: string | null;

  @Field({ nullable: true })
  @Column('date', {
    nullable: true,
    name: 'fecha_fin',
  })
  startEnd: string | null;

  @Field({ nullable: true })
  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'fecha_baja',
  })
  downDate: Date | null;

  @Field({ nullable: true })
  @Column('varchar', {
    nullable: true,
    name: 'motivo_baja',
  })
  downMotive: string | null;

  @Field(type => Int)
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'incluida',
  })
  isIncluded: boolean;

  @Field(type => Int)
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'1\'',
    name: 'active',
  })
  isActive: boolean;

  @Field()
  @Column({
    type: 'simple-enum',
    enum: InscriptionStatus,
    default: InscriptionStatus.Registered,
    nullable: false,
    name: 'id_estado_inscripcion',
  })
  inscriptionStatus: InscriptionStatus;

  @Field(type => Activity)
  @ManyToOne(type => Activity, activity => activity.academyActInscription)
  @JoinColumn({
    name: 'id_academia',
    referencedColumnName: 'id',
  })
  activity: Activity;

  @Field(type => Student)
  @ManyToOne(() => Student, (student) => student.studentAcInscriptions)
  @JoinColumn({
    name: 'id_alumno',
    referencedColumnName: 'id',
  })
  student: Student;

  @Field(type => Level)
  @ManyToOne(() => Level, (level) => level.levelAcademyInscription)
  @JoinColumn({
    name: 'id_nivel',
    referencedColumnName: 'id',
  })
  schoolLevel: Level;

  @Field(type => Grade)
  @ManyToOne(() => Grade, (grade) => grade.gradeAcademyInscription)
  @JoinColumn({
    name: 'id_grado',
    referencedColumnName: 'id',
  })
  schoolGrade: Grade;

  @Field(type => Group)
  @ManyToOne(() => Group, (group) => group.groupAcademyInscription)
  @JoinColumn({
    name: 'id_grupo',
    referencedColumnName: 'id',
  })
  schoolGroup: Group;

  @Field(type => BranchOffice)
  @ManyToOne(() => BranchOffice, (campus) => campus.campusAcIns)
  @JoinColumn({
    name: 'id_plantel',
    referencedColumnName: 'id',
  })
  inscriptionCampus: BranchOffice;

  @Field(type => Cycle)
  @ManyToOne(() => Cycle, (cycle) => cycle.cycleAcIns)
  @JoinColumn({
    name: 'id_ciclo',
    referencedColumnName: 'id',
  })
  cycle: Cycle;

  @Field(type => AcademyActivitiesGroup)
  @ManyToOne(() => AcademyActivitiesGroup, (group) => group.acGroupAcInsc)
  @JoinColumn({
    name: 'id_ac_grupo',
    referencedColumnName: 'id',
  })
  academyGroup: AcademyActivitiesGroup;

  @Field(type => User)
  @ManyToOne(() => User, (user) => user.userAcInsHigh)
  @JoinColumn({
    name: 'id_agente',
    referencedColumnName: 'id',
  })
  enrollmentAgent: User;

  @Field(type => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.userAcInsDown)
  @JoinColumn({
    name: 'id_agente_baja',
    referencedColumnName: 'id',
  })
  unEnrollerAgent: User | null;

  @Field(type => [AcademyInscriptionConcepts])
  @OneToMany(() => AcademyInscriptionConcepts, (AcInscripConcepts) => AcInscripConcepts.acInscription)
  concepts: AcademyInscriptionConcepts[];


}
