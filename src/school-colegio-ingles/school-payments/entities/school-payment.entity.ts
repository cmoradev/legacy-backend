import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { SchoolChargeDetails } from '../../charges-school/school-charges-details/entities/school-charge-details.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { SchoolPaymentCharge } from '../../school-payments-charges/entities/school-payment-charge.entity';

@Entity('school_payment')
export class SchoolPayment extends Base {

    @Column('varchar', {
        nullable: false,
        length: 20,
    })
    productCode: string;

    @Column('varchar', {
        nullable: false,
        length: 20,
    })
    unitCode: string;

    @Column('varchar', {
        nullable: true,
        length: 100,
    })
    unit: string | null;

    @Column('varchar', {
        nullable: true,
        length: 250,
    })
    description: string | null;

    @Column('int', {
        nullable: false,
        default: 1,
    })
    quantity: number;

    @Column('int', {
        nullable: true,
    })
    payDay: number;

    @Column('int', {
        nullable: true,
    })
    payMonth: number;

    @Column('varchar', {
        nullable: true,
    })
    satCode: string | null;

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    price: number | null;

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    withIva: number;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    iva: string;

    @Column('date', {
        nullable: true,
    })
    paidDate: Date; // fecha que pago

    @Column('date', {
        nullable: true,
    })
    payDate: Date; // fecha de pago

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @Column({
        type: 'simple-enum',
        nullable: false,
        default: PaymentStatus.Debit,
        enum: PaymentStatus,
    })
    statusPayment: PaymentStatus;

    @Column('varchar', {
        nullable: true,
    })
    ministoreSale: string | null;

    @Column('varchar', {
        nullable: true,
    })
    ministorePayment: string | null;

    @OneToMany(type => SchoolChargeDetails, schoolCharge => schoolCharge.schoolPlanPayment)
    schoolChargeDetail: SchoolChargeDetails[];

    // @OneToOne(() => PaymentPlanConcept, (paymentPlanConcept) => paymentPlanConcept.schoolPayment)
    // @JoinColumn()
    // paymentPlanConcept: PaymentPlanConcept;

    @ManyToOne(() => PaymentPlanConcept, (paymentPlanConcept) => paymentPlanConcept.schoolPayment)
    paymentPlanConcept: PaymentPlanConcept;

    @ManyToOne(() => Inscription, (inscription) => inscription.schoolPayments)
    inscription: Inscription;

    @OneToMany(() => SchoolPaymentCharge, (extraCharges) => extraCharges.schoolPaymentChargeDetail)
    extraCharges: SchoolPaymentCharge[];
}
