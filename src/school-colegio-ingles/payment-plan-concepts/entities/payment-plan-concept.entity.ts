import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { PaymentPlanConceptTypeEnum } from '../enums/payment-plan-concept-type.enum';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';
import { Months } from '../../../common/enums/months.enum';
import { PaymentPlanConceptCharges } from '../../payment-plan-concept-charges/entities/payment-plan-concept-charges.entity';

@Entity()
export class PaymentPlanConcept extends Base {

    @Column('varchar', {
        nullable: false,
        length: 300,
    })
    name: string;

    @Column( {
        type: 'simple-enum',
        nullable: false,
        default: PaymentPlanConceptTypeEnum.OneTime,
        enum: PaymentPlanConceptTypeEnum,
    })
    conceptType: PaymentPlanConceptTypeEnum;

    @Column('varchar', {
        nullable: true,
    })
    description?: string | null;

    @Column('int', {
        nullable: false,
        default: 1,
    })
    quantity: number;

    @Column('int', {
        nullable: true,
    })
    startDay: number;

    @Column( {
        type: 'simple-enum',
        nullable: true,
        enum: Months,
    })
    startMonth: Months;

    @Column({
        type:'simple-enum',
        nullable: true,
        enum: Months,
    })
    endMonth: Months;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    price: number;

    @Column('varchar', {
        nullable: true,
    })
    satCode?: string | null;

    @Column('varchar', {
        nullable: true,
    })
    unitCode?: string | null;

    @Column('varchar', {
        nullable: true,
        length: 100,
    })
    unity?: string | null;

    @Column('boolean', {
        nullable: true,
        default: false,
    })
    withIva: number;

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @ManyToOne(() => PaymentPlan, (paymentPlan) => paymentPlan.paymentPlanConcepts)
    paymentPlan: PaymentPlan;

    @ManyToMany(type => Grade, (grade) => grade.paymentPlansConcepts)
    @JoinTable()
    grades: Grade[];

    @OneToOne(() => SchoolPayment, (schoolPayment) => schoolPayment.paymentPlanConcept)
    schoolPayment: SchoolPayment;

    @OneToMany(() => PaymentPlanConceptCharges, (extraCharges) => extraCharges.paymentPlanChargeDetail, { cascade: ['insert']})
    extraCharges: PaymentPlanConceptCharges;
}
