import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Group } from '../../groups/entities/group.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class StudyPlanVariant extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    code: string;

    @Field(type => Int)
    @Column()
    credits: number;

    @Field()
    @Column('varchar', {
        nullable: false,
    })
    status: string;

    @Field(type => [Subject])
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
    @Field(type => [Classroom])
    @OneToMany(() => Classroom, classroom => classroom.studyPlanVariant)
    classrooms: Classroom[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudyPlanVariant)
    studyPlanVaInscriptions: Inscription[];

    @Field(type => StudyPlan)
    @ManyToOne(() => StudyPlan, studyPlanGeneral => studyPlanGeneral.studyPlansVariants)
    studyPlan: StudyPlan;

    @Field(type => [Assignment])
    @OneToMany(() => Assignment, (assignment) => assignment.studyPlanVariant)
    assignments: Assignment[];

    @Field(type => [AssignmentSubject])
    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.studyPlanVariant)
    assignmentSubjects: AssignmentSubject[];

}
