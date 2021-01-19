import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../../../../system/system-extra-charges/enums/system-extra-charges.enum';
import { AcademyChargeDetails } from '../../academy-charge-details/entities/academy-charge-details.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_charges_details_extra_charges')
export class AcademyChargeDetailsExtraCharge extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
    })
    name: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Field(type => TypeChargeApplicationEnum, { nullable: true })
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: TypeChargeApplicationEnum,
    })
    applicationType: TypeChargeApplicationEnum;

    @Field(type => OperationApplicationEnum, { nullable: true })
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Field(type => SystemTypeExtraChargesEnum, { nullable: true })
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @Field(type => AcademyChargeDetails)
    @ManyToOne(() => AcademyChargeDetails, (academy) => academy.extraCharges)
    chargeDetail: AcademyChargeDetails;

    @Field(type => SystemExtraCharges)
    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchool)
    systemExtraCharges: SystemExtraCharges;
}
