import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Level } from '../../levels/entities/level.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { Campus } from '../../campuses/entities/campus.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AssignmentInscription } from '../../assignment-incription/entities/assignment-inscription.entity';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { User } from '../../../system/users/entities/user.entity';

@Entity('inscripciones')
export class Inscription {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'id_alumnos',
  })
  idStudent: number;

  @Column('int', {
    nullable: false,
    name: 'id_plantel',
  })
  idPlantel: number;

  @Column('int', {
    nullable: false,
    name: 'id_ciclos',
  })
  idCycle: number;

  @Column('int', {
    nullable: false,
    name: 'id_nivel',
  })
  idLevel: number;

  @Column('int', {
    nullable: false,
    name: 'id_grados',
  })
  idGrade: number;

  @Column('int', {
    nullable: false,
    name: 'id_grupos',
  })
  idGroup: number;

  @Column('int', {
    nullable: false,
    name: 'id_status',
  })
  idStatus: number;

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

  @Column('int', {
    nullable: false,
  })
  campusId: number;
  @Column('int', {
    nullable: false,
  })
  levelId: number;
  @Column('int', {
    nullable: false,
  })
  gradeId: number;
    @Column('int', {
        nullable: false,
    })
    cycleId: number;
  @ManyToOne(() => Student, (student) => student.inscriptions)
  student: Student;

  @ManyToOne(() => Group, (group) => group.inscriptions)
  group: Group;

  @ManyToOne(() => Grade, (grade) => grade.inscriptions)
  grade: Grade;

  @ManyToOne(() => Level, (level) => level.inscriptions)
  level: Level;

  @ManyToOne(() => Cycle, (cycle) => cycle.inscriptions)
  cycle: Cycle;

  @ManyToOne(() => Campus, (campus) => campus.inscriptions)
  campus: Campus;

  @ManyToOne(() => User, (user) => user.schoolCreatorInscription)
  agentCreator: User;

  @ManyToOne(() => User, (user) => user.schoolEditorInscription)
  agentEditor: User;

  @ManyToOne(() => Classroom, (classroom) => classroom.inscriptions)
  classroom: Classroom;

  @OneToMany(() => AssignmentInscription, (assignmentInscription) => assignmentInscription.inscription)
  assignmentsInscription: AssignmentInscription[];
  @ManyToOne(() => StudyPlanVariant, (studyPlanVariant) => studyPlanVariant.inscriptions)
  studyPlanVariant: StudyPlanVariant;
  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.inscriptions)
  studyPlan: StudyPlan;

}
