import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('inscripciones')
export class Inscription extends Base {

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_alumnos',
    })
    idStudent: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idPlantel: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_ciclos',
    })
    idCycle: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_nivel',
    })
    idLevel: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_grados',
    })
    idGrade: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_grupos',
    })
    idGroup: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_status',
    })
    idStatus: number;

    /*
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
      name: 'cycleId',
    })
    cycleId: number;*/

    @Field(type => Student)
    @ManyToOne(() => Student, (student) => student.studentInscriptions)
    inscripStudent: Student;

    @Field(type => Group)
    @ManyToOne(() => Group, (group) => group.groupInscriptions)
    inscripGroup: Group;

    @Field(type => Grade)
    @ManyToOne(() => Grade, (grade) => grade.gradeInscriptions)
    inscripGrade: Grade;

    @Field(type => Level)
    @ManyToOne(() => Level, (level) => level.levelInscriptions)
    inscripLevel: Level;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.cycleInscriptions)
    inscripCycle: Cycle;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.campusInscriptions)
    inscripCampus: BranchOffice;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.userCchoolCreatorInscription)
    inscripAgentCreator: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.userCchoolEditorInscription)
    inscripAgentEditor: User;

    @Field(type => Classroom)
    @ManyToOne(() => Classroom, (classroom) => classroom.classroomInscriptions)
    inscripClassroom: Classroom;

    @Field(type => PaymentPlan)
    @ManyToOne(type => PaymentPlan, (p) => p.studentsInscriptions)
    paymentPlan: PaymentPlan;

    @Field(type => [AssignmentInscription])
    @OneToMany(() => AssignmentInscription, (assignmentInscription) => assignmentInscription.assignmentsInscription)
    inscripAssignmentsInscription: AssignmentInscription[];

    @Field(type => StudyPlanVariant)
    @ManyToOne(() => StudyPlanVariant, (studyPlanVariant) => studyPlanVariant.studyPlanVaInscriptions)
    inscripStudyPlanVariant: StudyPlanVariant;

    @Field(type => StudyPlan)
    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.studyPlaninscriptions)
    inscripStudyPlan: StudyPlan;

    @Field(type => [SchoolPayment])
    @OneToMany(() => SchoolPayment, (schoolPayment) => schoolPayment.inscription)
    schoolPayments: SchoolPayment[];

}
