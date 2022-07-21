import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class StudyPlanVariant extends Base {

    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    code: string;

    @Column()
    credits: number;

    @Column('varchar', {
        nullable: false,
    })
    status: string;

    @ManyToMany(() => Subject, subject => subject.studyPlansVariant)
    @JoinTable()
    subjects: Subject[];

    /**
     * TODO: Invertir relacion, va de uno a muchos. Una variante tiene muchos grupos.
     * StudyPlanVariant-> Groups[]
     * Group-> StudyPlanVariant
     */
    /*@OneToMany(() => Group, group => group.studyPlanVariant)
    groups: Group[];*/
    @OneToMany(() => Classroom, classroom => classroom.studyPlanVariant)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudyPlanVariant)
    studyPlanVaInscriptions: Inscription[];

    @ManyToOne(() => StudyPlan, studyPlanGeneral => studyPlanGeneral.studyPlansVariants)
    studyPlan: StudyPlan;

    @OneToMany(() => Assignment, (assignment) => assignment.studyPlanVariant)
    assignments: Assignment[];

    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.studyPlanVariant)
    assignmentSubjects: AssignmentSubject[];

}
