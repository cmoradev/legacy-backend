import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Level } from '../../levels/entities/level.entity';
import { Modality } from '../../modalities/entities/modality.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class StudyPlan extends Base {

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    code: string;

    @Field()
    @Column('varchar', {
        nullable: false,
    })
    status: string;

    @Field(type => [StudyPlanVariant])
    @OneToMany(type => StudyPlanVariant, (studyPlanVariants) => studyPlanVariants.studyPlan)
    studyPlansVariants: StudyPlanVariant[];

    @Field(type => Modality)
    @ManyToOne(type => Modality, (modality) => modality.studyPlans)
    modality: Modality;

    @Field(type => Assignment)
    @OneToMany(type => Assignment, (assignment) => assignment.studyPlan)
    assignment: Assignment;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: string;

    @Field({ nullable: true})
    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    endDate: string | null;

    @Field(type => Level)
    @ManyToOne(() => Level, (level) => level.studyPlans)
    level: Level;

    @Field(type => [Classroom])
    @OneToMany(() => Classroom, (classroom) => classroom.studyPlan)
    classrooms: Classroom[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudyPlan)
    studyPlaninscriptions: Inscription[];

    @Field(type => [PaymentPlan])
    @ManyToOne(() => PaymentPlan, (paymentPlan) => paymentPlan.studyPlan )
    paymentPlans: PaymentPlan[];


}
