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
import { SystemApplicationForms } from '../../system-application-forms/entities/system-application-forms.entity';

export enum OperationApplicationEnum {
  sum = 1,
  subtraction = 2,
  division = 3,
  multiplication = 4,
}

export enum TypeChargeApplicationEnum {
  percentage = 1,
  quantity = 2,
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

  @Column('date', {
    nullable: true,
    name: 'fecha_inicio',
  })
  startDate: string | null;

  @Column('date', {
    nullable: true,
    name: 'fecha_fin',
  })
  endDate: string | null;

  @ManyToOne(type => SystemApplicationForms, systemApplicationForms => systemApplicationForms.systemAppFormsExChages)
  @JoinColumn({
    name: 'id_formaplicacion',
    referencedColumnName: 'id',
  })
  extraChargesAppForms: SystemApplicationForms;

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

}
