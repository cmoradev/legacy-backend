import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
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
import { isDesktop } from '../../../common/desktop/desktop.config';

@Entity('ac_inscripciones_alumnos')
export class AcademyInscription extends Base {

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'clave_inscripcion',
  })
  keyInscription: string;

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

  @Column( {
    type: isDesktop ? 'date' : 'timestamp',
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

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'1\'',
    name: 'active',
  })
  isActive: boolean;

  @Column({
    type: 'simple-enum',
    enum: InscriptionStatus,
    default: InscriptionStatus.Registered,
    nullable: false,
    name: 'id_estado_inscripcion',
  })
  inscriptionStatus: InscriptionStatus;

  @ManyToOne(type => AcademyActivity, activity => activity.academyActInscription)
  @JoinColumn({
    name: 'id_academia',
    referencedColumnName: 'id',
  })
  activity: AcademyActivity;

  @ManyToOne(() => Student, (student) => student.studentAcInscriptions)
  @JoinColumn({
    name: 'id_alumno',
    referencedColumnName: 'id',
  })
  student: Student;

  @ManyToOne(() => Level, (level) => level.levelAcademyInscription)
  @JoinColumn({
    name: 'id_nivel',
    referencedColumnName: 'id',
  })
  schoolLevel: Level;

  @ManyToOne(() => Grade, (grade) => grade.gradeAcademyInscription)
  @JoinColumn({
    name: 'id_grado',
    referencedColumnName: 'id',
  })
  schoolGrade: Grade;

  @ManyToOne(() => Group, (group) => group.groupAcademyInscription)
  @JoinColumn({
    name: 'id_grupo',
    referencedColumnName: 'id',
  })
  schoolGroup: Group;

  @ManyToOne(() => BranchOffice, (campus) => campus.campusAcIns)
  @JoinColumn({
    name: 'id_plantel',
    referencedColumnName: 'id',
  })
  inscriptionCampus: BranchOffice;

  @ManyToOne(() => Cycle, (cycle) => cycle.cycleAcIns)
  @JoinColumn({
    name: 'id_ciclo',
    referencedColumnName: 'id',
  })
  cycle: Cycle;

  @ManyToOne(() => AcademyActivitiesGroup, (group) => group.acGroupAcInsc)
  @JoinColumn({
    name: 'id_ac_grupo',
    referencedColumnName: 'id',
  })
  academyGroup: AcademyActivitiesGroup;

  @ManyToOne(() => User, (user) => user.userAcInsHigh)
  @JoinColumn({
    name: 'id_agente',
    referencedColumnName: 'id',
  })
  enrollmentAgent: User;

  @ManyToOne(() => User, (user) => user.userAcInsDown)
  @JoinColumn({
    name: 'id_agente_baja',
    referencedColumnName: 'id',
  })
  unEnrollerAgent: User | null;

  @OneToMany(() => AcademyInscriptionConcepts, (AcInscripConcepts) => AcInscripConcepts.acInscription)
  concepts: AcademyInscriptionConcepts[];


}
