import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {StudyPlanVariant} from '../../study-plan-variants/entities/study-plan-variants.entity';
import {StudyPlan} from '../../study-plans/entities/study-plan.entity';
import {Teacher} from '../../teachers/entities/teacher.entity';
import {Cycle} from '../../cycles/entities/cycle.entity';
import {AssignmentSubject} from '../../assignments-subjects/entities/assignment-subject.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AssignmentInscription } from '../../assignment-incription/entities/assignment-inscription.entity';

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

    @ManyToOne(() => Classroom, classroom => classroom.assignments)
    classroom: Classroom;

    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.assignment)
    assignmentsSubjects: AssignmentSubject[];

    @OneToMany(() => AssignmentInscription, (assignmentInscription) => assignmentInscription.assignment)
    assignmentsInscription: AssignmentInscription[];

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
