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
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { InscriptionStatus } from '../../../common/enums/PaymentStatus';

@ObjectType()
@Entity('inscripciones')
export class Inscription extends Base {

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_status',
    })
    idStatus: number;

    @Field(type => InscriptionStatus)
    @Column('simple-enum', {
        enum: InscriptionStatus,
        default: InscriptionStatus.Registered,
        nullable: false,
    })
    statusInscription: InscriptionStatus;

    @Field(type => Student)
    @ManyToOne(() => Student, (student) => student.studentInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripStudent: Student;

    @Field(type => Group)
    @ManyToOne(() => Group, (group) => group.groupInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripGroup: Group;

    @Field(type => Grade)
    @ManyToOne(() => Grade, (grade) => grade.gradeInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripGrade: Grade;

    @Field(type => Level)
    @ManyToOne(() => Level, (level) => level.levelInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripLevel: Level;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.cycleInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripCycle: Cycle;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.campusInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripCampus: BranchOffice;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.userCchoolCreatorInscription, {
        cascade: ['update', 'insert'],
    })
    inscripAgentCreator: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.userCchoolEditorInscription, {
        cascade: ['update', 'insert'],
    })
    inscripAgentEditor: User;

    @Field(type => Classroom)
    @ManyToOne(() => Classroom, (classroom) => classroom.classroomInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripClassroom: Classroom;

    @Field(type => PaymentPlan)
    @ManyToOne(type => PaymentPlan, (p) => p.studentsInscriptions, {
        cascade: ['update', 'insert'],
    })
    paymentPlan: PaymentPlan;

    @Field(type => [AssignmentInscription])
    @OneToMany(() => AssignmentInscription, (assignmentInscription) => assignmentInscription.assignmentsInscription, {
        cascade: ['update', 'insert'],
    })
    inscripAssignmentsInscription: AssignmentInscription[];

    @Field(type => StudyPlanVariant)
    @ManyToOne(() => StudyPlanVariant, (studyPlanVariant) => studyPlanVariant.studyPlanVaInscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripStudyPlanVariant: StudyPlanVariant;

    @Field(type => StudyPlan)
    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.studyPlaninscriptions, {
        cascade: ['update', 'insert'],
    })
    inscripStudyPlan: StudyPlan;

    @Field(type => [SchoolPayment])
    @OneToMany(() => SchoolPayment, (schoolPayment) => schoolPayment.inscription, {
        cascade: ['update', 'insert'],
    })
    schoolPayments: SchoolPayment[];

}
