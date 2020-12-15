import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Subject extends Base {

    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    name: string;

    @Column(
        'varchar', {
            nullable: false,
            length: 20,
        },
    )
    code: string;

    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    shortName: string;

    @Column('int', {
        nullable: true,
    })
    credits: number | null;

    @ManyToMany(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.subjects)
    studyPlansVariant: StudyPlanVariant[];

    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.subject)
    assignmentsSubjects: AssignmentSubject[];
    
}
