import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { PaymentPlanConceptTypeEnum } from '../enums/payment-plan-concept-type.enum';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';
import { Months } from '../../../common/enums/months.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class PaymentPlanConcept extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 300,
    })
    name: string;

    @Field()
    @Column( {
        type: 'simple-enum',
        nullable: false,
        default: PaymentPlanConceptTypeEnum.OneTime,
        enum: PaymentPlanConceptTypeEnum,
    })
    conceptType: PaymentPlanConceptTypeEnum;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    description?: string | null;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: 1,
    })
    quantity: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
    })
    startDay: number;

    @Field()
    @Column( {
        type: 'simple-enum',
        nullable: true,
        enum: Months,
    })
    startMonth: Months;

    @Field()
    @Column({
        type:'simple-enum',
        nullable: true,
        enum: Months,
    })
    endMonth: Months;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    price: number;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
    })
    satCode?: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    unitCode?: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 100,
    })
    unity?: string | null;

    @Field()
    @Column('boolean', {
        nullable: true,
        default: false,
    })
    withIva: number;

    @Field()
    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @Field(type => PaymentPlan)
    @ManyToOne(() => PaymentPlan, (paymentPlan) => paymentPlan.paymentPlanConcepts)
    paymentPlan: PaymentPlan;

    @Field(type => [Grade])
    @ManyToMany(type => Grade, (grade) => grade.paymentPlansConcepts)
    @JoinTable()
    grades: Grade[];

    @Field(type => SchoolPayment)
    @OneToOne(() => SchoolPayment, (schoolPayment) => schoolPayment.paymentPlanConcept)
    schoolPayment: SchoolPayment;
}
