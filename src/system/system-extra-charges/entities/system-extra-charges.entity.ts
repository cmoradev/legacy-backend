import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { SystemTypeExtraCharges } from '../../system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolChargesDetailsExtraCharges } from '../../../school-colegio-ingles/charges-school/school-charges-details-extra-charges/entities/school-charges-details-extra-charges.entity';
import { MiniStoreDetailsExtraCharges } from '../../../mini-store/store-sales/mini-store-details-extra-charges/entities/mini-store-details-extra-charges.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import {
    ApplicationFormEnum,
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../enums/system-extra-charges.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SchoolPaymentCharge } from '../../../school-colegio-ingles/school-payments-charges/entities/school-payment-charge.entity';
import { AcademyInscriptionConceptCharges } from '../../../academy/academy-inscription-concept-charges/entites/academy-inscription-concept-charges.entity';
import { AcademyChargeDetailsExtraCharge } from '../../../academy/charges-academy/academy-charge-details-extra-charge/entities/academy-charge-details-extra-charge.entity';

@ObjectType()
@Entity('ac_descuentos')
export class SystemExtraCharges extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 300,
        name: 'nombre',
    })
    name: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'porcentaje',
    })
    quantity: number;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        enum: TypeChargeApplicationEnum,
        default: TypeChargeApplicationEnum.percentage,
    })
    typeApplication: TypeChargeApplicationEnum;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        enum: OperationApplicationEnum,
        default: OperationApplicationEnum.sum,
    })
    operation: OperationApplicationEnum;

    @Field(type => Int)
    @Column('int', {
        nullable: true,
        name: 'dia_inicio',
    })
    startDay: number | null;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'dia_fin',
    })
    endDay: number | null;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_inicio',
    })
    startDate: Date;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_fin',
    })
    endDate: Date;

    @Field()
    @Column({
        type: 'simple-enum',
        name: 'id_formaplicacion',
        nullable: false,
        enum: ApplicationFormEnum,
        default: ApplicationFormEnum.Manual,
    })
    applicationForm: ApplicationFormEnum;

    @Field(type => SystemTypeExtraCharges)
    @ManyToOne(type => SystemTypeExtraCharges, systemTypeExtraCharges => systemTypeExtraCharges.systemTyExCharCharge)
    @JoinColumn({
        name: 'id_tipo_descuento',
        referencedColumnName: 'id',
    })
    extraChargesType: SystemTypeExtraCharges;

    @Field(type => BranchOffice)
    @ManyToOne(type => BranchOffice, campus => campus.campusExtraCharges)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    extraChargesCampus: BranchOffice;

    @Field(type => Cycle)
    @ManyToOne(type => Cycle, cycle => cycle.cycleSystemExtraCharges)
    @JoinColumn({
        name: 'id_ciclo',
        referencedColumnName: 'id',
    })
    extraChargesCycle: Cycle;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'active',
    })
    isActive: boolean;

    @Field(type => [SchoolChargesDetailsExtraCharges])
    @OneToMany(() => SchoolChargesDetailsExtraCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeSchoolDetails: SchoolChargesDetailsExtraCharges[];

    @Field(type => [SchoolPaymentCharge])
    @OneToMany(() => SchoolPaymentCharge, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeSchoolPayment: SchoolPaymentCharge[];

    @Field(type => [AcademyChargeDetailsExtraCharge])
    @OneToMany(() => AcademyChargeDetailsExtraCharge, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeAcademiaDetails: AcademyChargeDetailsExtraCharge[];

    @Field(type => [AcademyInscriptionConceptCharges])
    @OneToMany(() => AcademyInscriptionConceptCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeAcademiaPayment: AcademyInscriptionConceptCharges[];

    @Field(type => [MiniStoreDetailsExtraCharges])
    @OneToMany(() => MiniStoreDetailsExtraCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeMiniStore: MiniStoreDetailsExtraCharges[];
}
