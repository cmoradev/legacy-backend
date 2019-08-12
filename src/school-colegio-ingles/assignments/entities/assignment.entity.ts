import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {StudyPlanVariant} from '../../study-plan-variants/entities/study-plan-variants.entity';
import {StudyPlan} from '../../study-plans/entities/study-plan.entity';
import {Teacher} from '../../teachers/entities/teacher.entity';
import { Group} from '../../groups/entities/group.entity';
import {Cycle} from '../../subjects/entities/cycle.entity';
import {AssignmentSubject} from '../../assignments-subjects/entities/assignment-subject.entity';

@Entity()
export class Assignment {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ManyToOne(() => Cycle, (cycle) => cycle.assignments)
    cycle: Cycle;

    @ManyToOne(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.assignment)
    studyPlanVariant: StudyPlanVariant;

    @ManyToOne(() => StudyPlan, studyPlan => studyPlan.assignment)
    studyPlan: StudyPlan;

    @ManyToOne(() => Teacher, teacher => teacher.assignments)
    teacher: Teacher;

    @ManyToOne(() => Group, group => group.assignments)
    group: Group;

    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.assignment)
    assignmentsSubjects: AssignmentSubject[];

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
