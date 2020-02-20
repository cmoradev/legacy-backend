import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { Campus } from '../../../school-colegio-ingles/campuses/entities/campus.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { SystemTypeExtraCharges } from '../../system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolChargesDetailsExtraCharges } from '../../../school-colegio-ingles/charges-school/school-charges-details-extra-charges/entities/school-charges-details-extra-charges.entity';
import { MiniStoreDetailsExtraCharges } from '../../../mini-store/store-sales/mini-store-details-extra-charges/entities/mini-store-details-extra-charges.entity';

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

export enum ApplicationFormEnum {
    Manual = 1,
    Automatic = 2,
}

@Entity('ac_descuentos')
export class SystemExtraCharges {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

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
        type: 'enum',
        nullable: false,
        enum: TypeChargeApplicationEnum,
        default: TypeChargeApplicationEnum.percentage,
    })
    typeApplication: OperationApplicationEnum;

    @Column({
        type: 'enum',
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

    @Column('timestamp', {
        nullable: true,
        name: 'fecha_inicio',
    })
    startDate: Date;

    @Column('timestamp', {
        nullable: true,
        name: 'fecha_fin',
    })
    endDate: Date;

    @Column({
        type: 'enum',
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

    @ManyToOne(type => Campus, campus => campus.campusExtraCharges)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    extraChargesCampus: Campus;

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

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @OneToMany(() => SchoolChargesDetailsExtraCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeSchool: SchoolChargesDetailsExtraCharges[];

    @OneToMany(() => MiniStoreDetailsExtraCharges, (extraCharges) => extraCharges.systemExtraCharges)
    extraChargeMiniStore: MiniStoreDetailsExtraCharges[];

}
