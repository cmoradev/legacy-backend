import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolChargeDetails } from '../../school-charges-details/entities/school-charge-details.entity';
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../../../../system/system-extra-charges/enums/system-extra-charges.enum';

@Entity('school_charges_details_extra_charges')
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
        type: 'simple-enum',
        nullable: true,
        enum: TypeChargeApplicationEnum,
    })
    applicationType: TypeChargeApplicationEnum;

    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @ManyToOne(() => SchoolChargeDetails, (schoolCharge) => schoolCharge.extraCharges)
    chargeDetail: SchoolChargeDetails;

    // todo
    // FALTA PONER EL ID CORRECTO DEL NOMBRE DE LA COLUMNA
    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchoolDetails)
    systemExtraCharges: SystemExtraCharges;
}
