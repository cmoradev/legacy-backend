import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class AssignmentSubject extends Base {

    @Field(type => Int)
    @Column()
    credits: number;

    @Field()
    @Column()
    isOptional: boolean;

    @Field(type => StudyPlanVariant)
    @ManyToOne(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.assignmentSubjects)
    studyPlanVariant: StudyPlanVariant;

    @Field(type => Subject)
    @ManyToOne(() => Subject, (subject) => subject.assignmentsSubjects)
    subject: Subject;

    @Field(type => Grade)
    @ManyToOne(() => Grade, (grade) => grade.assignmentsSubjects)
    grade: Grade;

    @Field(type => [Assignment])
    @OneToMany(() => Assignment, (assignment) => assignment.assignmentSubject)
    assignments: Assignment[];

}
