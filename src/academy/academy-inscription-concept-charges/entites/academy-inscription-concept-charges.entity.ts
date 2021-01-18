import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../../../system/system-extra-charges/enums/system-extra-charges.enum';
import { AcademyInscriptionConcepts } from '../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('ac_inscrip_concepts_extra_charges')
export class AcademyInscriptionConceptCharges extends Base {

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

    @Field(type => OperationApplicationEnum)
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Field(type => SystemTypeExtraChargesEnum)
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @Field(type => AcademyInscriptionConcepts)
    @ManyToOne(() => AcademyInscriptionConcepts, (academy) => academy.extraCharges)
    inscChargeDetail: AcademyInscriptionConcepts;

    @Field(type => SystemExtraCharges)
    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchool)
    systemExtraCharges: SystemExtraCharges;
}
