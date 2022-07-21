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
import { SchoolPaymentCharge } from '../../../school-colegio-ingles/school-payments-charges/entities/school-payment-charge.entity';
import { AcademyInscriptionConceptCharges } from '../../../academy/academy-inscription-concept-charges/entites/academy-inscription-concept-charges.entity';
import { AcademyChargeDetailsExtraCharge } from '../../../academy/charges-academy/academy-charge-details-extra-charge/entities/academy-charge-details-extra-charge.entity';

@Entity('ac_descuentos')
export class SystemExtraCharges extends Base {

    @Column('varchar', {
        nullable: false,
        length: 300,
        name: 'nombre',
    })
    name: string;

    @Column('int', {
        nullable: false,
        name: 'porcentaje',
    })
    quantity: number;

    @Column({
        type: 'simple-enum',
        nullable: false,
        enum: TypeChargeApplicationEnum,
        default: TypeChargeApplicationEnum.percentage,
    })
    typeApplication: TypeChargeApplicationEnum;

    @Column({
        type: 'simple-enum',
        nullable: false,
        enum: OperationApplicationEnum,
        default: OperationApplicationEnum.sum,
    })
    operation: OperationApplicationEnum;

    @Column('int', {
        nullable: true,
        name: 'dia_inicio',
    })
    startDay: number | null;

    @Column('int', {
        nullable: true,
        name: 'dia_fin',
    })
    endDay: number | null;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_inicio',
    })
    startDate: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_fin',
    })
    endDate: Date;

    @Column({
        type: 'simple-enum',
        name: 'id_formaplicacion',
        nullable: false,
        enum: ApplicationFormEnum,
        default: ApplicationFormEnum.Manual,
    })
    applicationForm: ApplicationFormEnum;

    @ManyToOne(type => SystemTypeExtraCharges, systemTypeExtraCharges => systemTypeExtraCharges.systemTyExCharCharge)
    @JoinColumn({
        name: 'id_tipo_descuento',
        referencedColumnName: 'id',
    })
    extraChargesType: SystemTypeExtraCharges;

    @ManyToOne(type => BranchOffice, campus => campus.campusExtraCharges)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    extraChargesCampus: BranchOffice;

    @ManyToOne(type => Cycle, cycle => cycle.cycleSystemExtraCharges)
    @JoinColumn({
        name: 'id_ciclo',
        referencedColumnName: 'id',
    })
    extraChargesCycle: Cycle;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'active',
    })
    isActive: boolean;

    @OneToMany(() => SchoolChargesDetailsExtraCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeSchoolDetails: SchoolChargesDetailsExtraCharges[];

    @OneToMany(() => SchoolPaymentCharge, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeSchoolPayment: SchoolPaymentCharge[];

    @OneToMany(() => AcademyChargeDetailsExtraCharge, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeAcademiaDetails: AcademyChargeDetailsExtraCharge[];

    @OneToMany(() => AcademyInscriptionConceptCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeAcademiaPayment: AcademyInscriptionConceptCharges[];

    @OneToMany(() => MiniStoreDetailsExtraCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeMiniStore: MiniStoreDetailsExtraCharges[];
}
