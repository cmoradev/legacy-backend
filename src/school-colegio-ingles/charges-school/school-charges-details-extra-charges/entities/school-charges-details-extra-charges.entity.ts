import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolChargeDetails } from '../../school-charges-details/entities/school-charge-details.entity';

export enum OperationApplicationEnum {
    sum = 'sum',
    subtraction = 'subtraction',
    division = 'division',
    multiplication = 'multiplication',
}

export enum TypeChargeApplicationEnum {
    percentage = 1,
    quantity = 2,
}

@Entity('school-charges-details-extra-charges')
export class SchoolChargesDetailsExtraCharges extends Base {

    @Column('varchar', {
        nullable: false,
    })
    name: string;

    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Column({
        type: 'enum',
        nullable: true,
        enum: TypeChargeApplicationEnum,
    })
    applicationType: OperationApplicationEnum;

    @Column({
        type: 'enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Column({
        type: 'enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @ManyToOne(() => SchoolChargeDetails, (schoolCharge) => schoolCharge.extraCharges)
    schoolChargeDetails: SchoolChargeDetails;

    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchool)
    systemExtraCharges: SystemExtraCharges;
}
