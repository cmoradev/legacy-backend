import {Column, Entity, ManyToOne} from "typeorm";
import { Base } from '../../../../common/orm/entities/base.entity';
import {SystemExtraCharges} from "../../../../system/system-extra-charges/entities/system-extra-charges.entity";
import {SystemTypeExtraChargesEnum} from "../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity";
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum
} from "../../../../system/system-extra-charges/enums/system-extra-charges.enum";
import {AcademyInscription} from "../../../academy-inscription/entities/academy-inscription.entity";

@Entity('ac_inscrip_charges_details_extra_charges')
export class InscriptionAcademyChargeDetailsExtraChargeEntity extends Base {

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
    applicationType: TypeChargeApplicationEnum;

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

     @ManyToOne(() => AcademyInscription, (academy) => academy.extraCharges)
     inscChargeDetail: AcademyInscription;

    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchool)
    systemExtraCharges: SystemExtraCharges;
}
