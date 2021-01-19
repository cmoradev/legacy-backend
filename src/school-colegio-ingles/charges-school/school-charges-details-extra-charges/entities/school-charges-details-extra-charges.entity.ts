import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolChargeDetails } from '../../school-charges-details/entities/school-charge-details.entity';
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../../../../system/system-extra-charges/enums/system-extra-charges.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('school_charges_details_extra_charges')
export class SchoolChargesDetailsExtraCharges extends Base {

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

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: TypeChargeApplicationEnum,
    })
    applicationType: TypeChargeApplicationEnum;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @Field(type => SchoolChargeDetails)
    @ManyToOne(() => SchoolChargeDetails, (schoolCharge) => schoolCharge.extraCharges)
    chargeDetail: SchoolChargeDetails;

    @Field(type => SystemExtraCharges)
    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchool)
    systemExtraCharges: SystemExtraCharges;
}
