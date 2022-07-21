import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { SchoolChargesDetailsExtraCharges } from '../../school-charges-details-extra-charges/entities/school-charges-details-extra-charges.entity';
import { SchoolPayment } from '../../../school-payments/entities/school-payment.entity';

@Entity('school_charges_details')
export class SchoolChargeDetails extends Base {

    @Column('varchar', {
        nullable: false,
    })
    codeConcept: string;

    @Column('varchar', {
        nullable: true,
    })
    codeUnit: string | null;

    @Column('varchar', {
        nullable: true,
    })
    unidad: string | null;

    @Column('varchar', {
        nullable: false,
    })
    concept: string;

    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    price: number;

    @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesDetails)
    schoolCharge: SchoolCharge;

    @OneToMany(() => SchoolChargesDetailsExtraCharges, (extraCharges) => extraCharges.chargeDetail, {
        cascade: ['insert'],
    })
    extraCharges: SchoolChargesDetailsExtraCharges[];

    @ManyToOne(type => SchoolPayment, schoolPayment => schoolPayment.schoolChargeDetail, {
        cascade: ['insert'],
    })
    schoolPlanPayment: SchoolPayment;
}
