import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class AssignmentSubject extends Base {

    @Column()
    credits: number;

    @Column()
    isOptional: boolean;

    @ManyToOne(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.assignmentSubjects)
    studyPlanVariant: StudyPlanVariant;

    @ManyToOne(() => Subject, (subject) => subject.assignmentsSubjects)
    subject: Subject;

    @ManyToOne(() => Grade, (grade) => grade.assignmentsSubjects)
    grade: Grade;

    @OneToMany(() => Assignment, (assignment) => assignment.assignmentSubject)
    assignments: Assignment[];

}
