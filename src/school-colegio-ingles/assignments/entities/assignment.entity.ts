import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AssignmentInscription } from '../../assignment-incription/entities/assignment-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Assignment extends Base {

    @ManyToOne(() => Cycle, (cycle) => cycle.assignments)
    cycle: Cycle;

    @ManyToOne(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.assignments)
    studyPlanVariant: StudyPlanVariant;

    @ManyToOne(() => StudyPlan, studyPlan => studyPlan.assignment)
    studyPlan: StudyPlan;

    @ManyToOne(() => Teacher, teacher => teacher.assignments)
    teacher: Teacher;

    @ManyToOne(() => Classroom, classroom => classroom.assignments)
    classroom: Classroom;

    @ManyToOne(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.assignments)
    assignmentSubject: AssignmentSubject;

    @OneToMany(() => AssignmentInscription, (assignmentInscription) => assignmentInscription.assignment)
    assignmentsInscription: AssignmentInscription[];

}
