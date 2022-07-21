import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Level } from '../../levels/entities/level.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AssignmentInscription } from '../../assignment-incription/entities/assignment-inscription.entity';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { User } from '../../../system/users/entities/user.entity';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { InscriptionStatusStudent } from '../../../common/enums/PaymentStatus';

@Entity('inscripciones')
export class Inscription extends Base {
  @Column('simple-enum', {
    enum: InscriptionStatusStudent,
    default: InscriptionStatusStudent.NewEnrollment,
    nullable: false,
    name: 'id_status',
  })
  idStatus: InscriptionStatusStudent;

  @ManyToOne(() => Student, (student) => student.studentInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripStudent: Student;

  @ManyToOne(() => Group, (group) => group.groupInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripGroup: Group;

  @ManyToOne(() => Grade, (grade) => grade.gradeInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripGrade: Grade;

  @ManyToOne(() => Level, (level) => level.levelInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripLevel: Level;

  @ManyToOne(() => Cycle, (cycle) => cycle.cycleInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripCycle: Cycle;

  @ManyToOne(() => BranchOffice, (campus) => campus.campusInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripCampus: BranchOffice;

  @ManyToOne(() => User, (user) => user.userCchoolCreatorInscription, {
    cascade: ['update', 'insert'],
  })
  inscripAgentCreator: User;

  @ManyToOne(() => User, (user) => user.userCchoolEditorInscription, {
    cascade: ['update', 'insert'],
  })
  inscripAgentEditor: User;

  @ManyToOne(() => Classroom, (classroom) => classroom.classroomInscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripClassroom: Classroom;

  @ManyToOne((type) => PaymentPlan, (p) => p.studentsInscriptions, {
    cascade: ['update', 'insert'],
  })
  paymentPlan: PaymentPlan;

  @OneToMany(
    () => AssignmentInscription,
    (assignmentInscription) => assignmentInscription.assignmentsInscription,
    {
      cascade: ['update', 'insert'],
    },
  )
  inscripAssignmentsInscription: AssignmentInscription[];

  @ManyToOne(
    () => StudyPlanVariant,
    (studyPlanVariant) => studyPlanVariant.studyPlanVaInscriptions,
    {
      cascade: ['update', 'insert'],
    },
  )
  inscripStudyPlanVariant: StudyPlanVariant;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.studyPlaninscriptions, {
    cascade: ['update', 'insert'],
  })
  inscripStudyPlan: StudyPlan;

  @OneToMany(
    () => SchoolPayment,
    (schoolPayment) => schoolPayment.inscription,
    {
      cascade: ['update', 'insert'],
    },
  )
  schoolPayments: SchoolPayment[];
}
