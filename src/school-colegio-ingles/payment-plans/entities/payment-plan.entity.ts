import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Level } from '../../levels/entities/level.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class PaymentPlan extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 300,
    })
    name: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 300,
    })
    description: string;

    @Field({ nullable: true })
    @Column('boolean', {
        nullable: true,
        default: false,
    })
    isActiveInStudyPlan: boolean;

    @Field({ nullable: true })
    @Column('boolean', {
        nullable: true,
        default: true,
    })
    isActive: boolean;

    @Field(type => StudyPlan)
    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.paymentPlans)
    studyPlan: StudyPlan;

    @Field(type => Level)
    @ManyToOne(() => Level, (level) => level.paymentPlans)
    level: Level;

    @Field(type => [PaymentPlanConcept])
    @OneToMany(() => PaymentPlanConcept,
        (paymentPlanConcept) => paymentPlanConcept.paymentPlan)
    paymentPlanConcepts: PaymentPlanConcept[];

    @Field(type => [Inscription])
    @OneToMany(type => Inscription, (i) => i.paymentPlan)
    studentsInscriptions: Inscription[];

    @Field(type => [Grade])
    @ManyToMany(type => Grade, (grade) => grade.paymentPlans)
    @JoinTable()
    grades: Grade[];
}
