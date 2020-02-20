import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { PaymentPlanConceptTypeEnum } from '../enums/payment-plan-concept-type.enum';

@Entity()
export class PaymentPlanConcept extends Base {

    @Column('varchar', {
        nullable: false,
        length: 300,
    })
    name: string;

    @Column('enum', {
        nullable: false,
        default: PaymentPlanConceptTypeEnum.OneTime,
        enum: PaymentPlanConceptTypeEnum,
    })
    conceptType: PaymentPlanConceptTypeEnum;

    @Column('varchar', {
        nullable: true,
    })
    description?: string | null;

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
}
