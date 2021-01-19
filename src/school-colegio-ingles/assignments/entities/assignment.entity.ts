import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AssignmentInscription } from '../../assignment-incription/entities/assignment-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Assignment extends Base {

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.assignments)
    cycle: Cycle;

    @Field(type => StudyPlanVariant)
    @ManyToOne(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.assignments)
    studyPlanVariant: StudyPlanVariant;

    @Field(type => StudyPlan)
    @ManyToOne(() => StudyPlan, studyPlan => studyPlan.assignment)
    studyPlan: StudyPlan;

    @Field(type => Teacher)
    @ManyToOne(() => Teacher, teacher => teacher.assignments)
    teacher: Teacher;

    @Field(type => Classroom)
    @ManyToOne(() => Classroom, classroom => classroom.assignments)
    classroom: Classroom;

    @Field(type => AssignmentSubject)
    @ManyToOne(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.assignments)
    assignmentSubject: AssignmentSubject;

    @Field(type => [AssignmentInscription])
    @OneToMany(() => AssignmentInscription, (assignmentInscription) => assignmentInscription.assignment)
    assignmentsInscription: AssignmentInscription[];

}
