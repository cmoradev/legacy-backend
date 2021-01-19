import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Subject extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    name: string;

    @Field()
    @Column(
        'varchar', {
            nullable: false,
            length: 20,
        },
    )
    code: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
    })
    shortName: string;

    @Field(type => Int)
    @Column('int', {
        nullable: true,
    })
    credits: number | null;

    @Field(type => [StudyPlanVariant])
    @ManyToMany(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.subjects)
    studyPlansVariant: StudyPlanVariant[];

    @Field(type => [AssignmentSubject])
    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.subject)
    assignmentsSubjects: AssignmentSubject[];

}
