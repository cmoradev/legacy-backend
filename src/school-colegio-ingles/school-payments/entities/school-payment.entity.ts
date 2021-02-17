import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { SchoolChargeDetails } from '../../charges-school/school-charges-details/entities/school-charge-details.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { SchoolPaymentCharge } from '../../school-payments-charges/entities/school-payment-charge.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('school_payment')
export class SchoolPayment extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 20,
    })
    productCode: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 20,
    })
    unitCode: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 100,
    })
    unit: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 250,
    })
    description: string | null;

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
    payDay: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
    })
    payMonth: number;

    @Field(type => Int, { nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    satCode: string | null;

    @Field(type => Int, { nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    price: number | null;

    @Field(type => Int, { nullable: false })
    @Column('boolean', {
        nullable: false,
        default: true,
    })
    withIva: number;

    @Field({ nullable: false })
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    iva: string;

    @Field({ nullable: true })
    @Column('date', {
        nullable: true,
    })
    paidDate: Date; // fecha que pago

    @Field({ nullable: true })
    @Column('date', {
        nullable: true,
    })
    payDate: Date; // fecha de pago

    @Field({ nullable: false })
    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: PaymentStatus.Debit,
        enum: PaymentStatus,
    })
    statusPayment: PaymentStatus;

    @Field(type => [SchoolChargeDetails])
    @OneToMany(type => SchoolChargeDetails, schoolCharge => schoolCharge.schoolPlanPayment)
    schoolChargeDetail: SchoolChargeDetails[];

    // @OneToOne(() => PaymentPlanConcept, (paymentPlanConcept) => paymentPlanConcept.schoolPayment)
    // @JoinColumn()
    // paymentPlanConcept: PaymentPlanConcept;

    @Field(type => PaymentPlanConcept)
    @ManyToOne(() => PaymentPlanConcept, (paymentPlanConcept) => paymentPlanConcept.schoolPayment)
    paymentPlanConcept: PaymentPlanConcept;

    @Field(type => Inscription)
    @ManyToOne(() => Inscription, (inscription) => inscription.schoolPayments)
    inscription: Inscription;

    @Field(type => [SchoolPaymentCharge])
    @OneToMany(() => SchoolPaymentCharge, (extraCharges) => extraCharges.schoolPaymentChargeDetail)
    extraCharges: SchoolPaymentCharge[];
}
