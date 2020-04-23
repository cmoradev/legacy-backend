import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { SchoolChargeDetails } from '../../charges-school/school-charges-details/entities/school-charge-details.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { PaymentPlanConceptTypeEnum } from '../../payment-plan-concepts/enums/payment-plan-concept-type.enum';
import { StatusPayment } from '../../../common/enums/statusPayment';

@Entity()
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
    @Column('int', {
        nullable: true,
    })
    paidDay: number;
    @Column('int', {
        nullable: true,
    })
    paidMonth: number;

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
    paidDate: Date;
    @Column('date', {
        nullable: true,
    })
    payDate: Date;

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @Column('enum', {
        nullable: false,
        default: StatusPayment.Debit,
        enum: StatusPayment,
    })
    statusPayment: StatusPayment;

    @OneToOne(type => SchoolChargeDetails, schoolCharge => schoolCharge.schoolPlanPayment)
    schoolChargeDetail: SchoolChargeDetails;

    @OneToOne(() => PaymentPlanConcept, (paymentPlanConcept) => paymentPlanConcept.schoolPayment)
    @JoinColumn()
    paymentPlanConcept: PaymentPlanConcept;

    @ManyToOne(() => Inscription, (inscription) => inscription.schoolPayments)
    inscription: Inscription;
}
