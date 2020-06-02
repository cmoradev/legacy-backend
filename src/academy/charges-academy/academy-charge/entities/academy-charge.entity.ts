import {
    Column,
    Entity,
    Generated,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    VersionColumn,
} from 'typeorm';
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

@Entity('ac_cobros')
export class AcademyCharge extends Base {
    @Column('varchar', {
        nullable: false,
        length: 40,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @Column('int', {
        nullable: false,
        name: 'id_modalidad',
    })
    idModality: number;

    @Column('int', {
        nullable: true,
        name: 'id_metodo_pago',
    })
    idMetodoPago: number | null;

    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'codigo_metodo_pago',
    })
    codigoMetodoPago: string | null;

    @Column('varchar', {
        nullable: true,
        name: 'nombre_metodo_pago',
    })
    nombreMetodoPago: string | null;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    status: PaymentStatus;

    @Column('text', {
        nullable: true,
        name: 'observaciones',
    })
    observations: string | null;

    @Column('timestamp', {
        nullable: true,
        name: 'fecha_cancelacion',
    })
    dateCancellation: Date | null;

    @Column('text', {
        nullable: true,
        name: 'motivos_cancelacion',
    })
    reasonsCancellation: string | null;


    @Column('int', {
        nullable: false,
        name: 'iva',
    })
    iva: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIva: number;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cambio',
    })
    change: number;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'timbrado',
    })
    timbrado: boolean;

    @ManyToOne(() => BranchOffice, (campus) => campus.campusAcademyCharge)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    chargeCampus: BranchOffice;

    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSetAcademy)
    academyBranchOfficeSet: BranchOfficeSetting;

    @ManyToOne(() => Cycle, (cycle) => cycle.cycleAcademyCharge)
    @JoinColumn({
        name: 'ciclo',
        referencedColumnName: 'id',
    })
    chargeCycle: Cycle;

    @ManyToOne(() => User, (user) => user.academyCharges)
    @JoinColumn({
        name: 'id_agente',
        referencedColumnName: 'id',
    })
    cashier: User;

    @ManyToOne(() => User, (user) => user.academyChargesCancellation)
    @JoinColumn({
        name: 'id_agente_cancelacion',
        referencedColumnName: 'id',
    })
    cashierCancellation: User;

    @ManyToOne(() => Student, (student) => student.academyCharges)
    @JoinColumn({
        name: 'id_alumno',
        referencedColumnName: 'id',
    })
    schoolStudent: Student;

    @OneToMany(() => AcademyChargeDetails, (details) => details.academyCharge, {
        cascade: ['insert', 'update'],
    })
    chargesDetails: AcademyChargeDetails[];

    @OneToMany(() => AcademyChargePayments, (detailspay) => detailspay.academyCharge, {
        cascade: ['insert'],
    })
    chargesPayments: AcademyChargePayments[];

    @OneToMany(() => AcademyChargeInvoice, (chargesInvoice) => chargesInvoice.academyCharge,
        {
            cascade: ['insert'],
        })
    chargesInvoice: AcademyChargeInvoice[];
}
