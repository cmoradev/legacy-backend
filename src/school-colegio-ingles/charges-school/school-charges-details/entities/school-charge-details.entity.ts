import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { SchoolChargesDetailsExtraCharges } from '../../school-charges-details-extra-charges/entities/school-charges-details-extra-charges.entity';
import { SchoolPayment } from '../../../school-payments/entities/school-payment.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('school_charges_details')
export class SchoolChargeDetails extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
    })
    codeConcept: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    codeUnit: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    unidad: string | null;

    @Field({ nullable: false })
    @Column('varchar', {
        nullable: false,
    })
    concept: string;

    @Field(type => Int, { nullable: false })
    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Field(type => Int, { nullable: false })
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    price: number;

    @Field(type => SchoolCharge)
    @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesDetails)
    schoolCharge: SchoolCharge;

    @Field(type => [SchoolChargesDetailsExtraCharges])
    @OneToMany(() => SchoolChargesDetailsExtraCharges, (extraCharges) => extraCharges.chargeDetail, {
        cascade: ['insert'],
    })
    extraCharges: SchoolChargesDetailsExtraCharges[];

    @Field(type => [SchoolPayment])
    @ManyToOne(type => SchoolPayment, schoolPayment => schoolPayment.schoolChargeDetail, {
        cascade: ['insert'],
    })
    schoolPlanPayment: SchoolPayment;
}
