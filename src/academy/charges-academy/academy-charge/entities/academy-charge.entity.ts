import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../../../system/users/entities/user.entity';
import { Student } from '../../../../school-colegio-ingles/students/entities/student.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { Cycle } from '../../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { AcademyChargeDetails } from '../../academy-charge-details/entities/academy-charge-details.entity';
import { AcademyChargePayments } from '../../academy-charge-payments/entities/academy-charge-payments.entity';
import { AcademyChargeInvoice } from '../../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_cobros')
export class AcademyCharge extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 40,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_modalidad',
    })
    idModality: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'id_metodo_pago',
    })
    idMetodoPago: number | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'codigo_metodo_pago',
    })
    codigoMetodoPago: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        name: 'nombre_metodo_pago',
    })
    nombreMetodoPago: string | null;

    @Field(type => PaymentStatus)
    @Column({
        type: 'simple-enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    status: PaymentStatus;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
        name: 'observaciones',
    })
    observations: string | null;

    @Field({ nullable: true })
    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    dateCancellation: Date | null;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
        name: 'motivos_cancelacion',
    })
    reasonsCancellation: string | null;


    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'iva',
    })
    iva: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIva: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cambio',
    })
    change: number;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'timbrado',
    })
    timbrado: boolean;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.campusAcademyCharge)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    chargeCampus: BranchOffice;

    @Field(type => BranchOfficeSetting)
    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSetAcademy)
    academyBranchOfficeSet: BranchOfficeSetting;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.cycleAcademyCharge)
    @JoinColumn({
        name: 'ciclo',
        referencedColumnName: 'id',
    })
    chargeCycle: Cycle;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.academyCharges)
    @JoinColumn({
        name: 'id_agente',
        referencedColumnName: 'id',
    })
    cashier: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.academyChargesCancellation)
    @JoinColumn({
        name: 'id_agente_cancelacion',
        referencedColumnName: 'id',
    })
    cashierCancellation: User;

    @Field(type => Student)
    @ManyToOne(() => Student, (student) => student.academyCharges)
    @JoinColumn({
        name: 'id_alumno',
        referencedColumnName: 'id',
    })
    schoolStudent: Student;

    @Field(type => [AcademyChargeDetails])
    @OneToMany(() => AcademyChargeDetails, (details) => details.academyCharge, {
        cascade: ['insert', 'update'],
    })
    chargesDetails: AcademyChargeDetails[];

    @Field(type => [AcademyChargePayments])
    @OneToMany(() => AcademyChargePayments, (detailspay) => detailspay.academyCharge, {
        cascade: ['insert'],
    })
    chargesPayments: AcademyChargePayments[];

    @Field(type => [AcademyChargeInvoice])
    @OneToMany(() => AcademyChargeInvoice, (chargesInvoice) => chargesInvoice.academyCharge,
      {
          cascade: ['insert'],
      })
    chargesInvoice: AcademyChargeInvoice[];
}
