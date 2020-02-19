import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { SchoolChargeDetails } from '../../school-charges-details/entities/school-charge-details.entity';

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
        nullable: false,
        enum: TypeChargeApplicationEnum,
    })
    typeApplication: OperationApplicationEnum;

    @Column({
        type: 'enum',
        nullable: false,
        enum: OperationApplicationEnum,
    })
    operation: OperationApplicationEnum;

    @Column({
        type: 'enum',
        nullable: false,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @Column('int', {
        nullable: false,
        name: 'id_ac_descuento',
    })
    idAcDescuento: number;

    @ManyToOne(() => SchoolChargeDetails, (schoolCharge) => schoolCharge.extraCharges)
    schoolChargeDetails: SchoolChargeDetails;
}
