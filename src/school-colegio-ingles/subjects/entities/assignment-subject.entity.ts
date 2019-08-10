import {Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {StudyPlanVariant} from '../../study-plan-variants/entities/study-plan-variants.entity';
import {StudyPlan} from '../../study-plans/entities/study-plan.entity';
import {Teacher} from './teacher.entity';
import {Subject} from './subject.entity';
import {Grade} from '../../grades/entities/grade.entity';
import {Assignment} from './assignment.entity';

// import {studyPlans_subjects} from "./studyPlans_subjects";

@Entity()
export class AssignmentSubject {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    credits: number;

    @Column()
    isOptional: boolean;

    @ManyToOne(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.assignmentSubjects)
    studyPlanVariant: StudyPlanVariant;

    @ManyToOne(() => Subject, (subject) => subject.assignmentsSubjects)
    subject: Subject;

    @ManyToOne(() => Grade, (grade) => grade.assignmentsSubjects )
    grade: Grade;

    @ManyToOne(() => Assignment, (assignment) => assignment.assignmentsSubjects)
    assignment: Assignment;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',

    })
    updatedAt: Date;
}
