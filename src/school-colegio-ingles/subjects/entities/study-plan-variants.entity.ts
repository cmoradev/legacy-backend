import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Subject} from './subject.entity';
import {StudyPlan} from './study-plan.entity';
import {Assignment} from './assignment.entity';
import {AssignmentSubject} from './assignment-subject.entity';
import {Group} from './group.entity';

@Entity()
export class StudyPlanVariant {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

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
    @OneToMany(() => Group, group => group.studyPlanVariant)
    groups: Group[];

    @ManyToOne(() => StudyPlan, studyPlanGeneral => studyPlanGeneral.studyPlansVariants)
    studyPlan: StudyPlan;

    @OneToMany(() => Assignment, (assignment) => assignment.studyPlanVariant)
    assignment: Assignment[];

    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.studyPlanVariant)
    assignmentSubjects: AssignmentSubject[];

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
