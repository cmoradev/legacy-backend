import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { Cycle } from '../../../cycles/entities/cycle.entity';
import { Campus } from '../../../campuses/entities/campus.entity';
import { Student } from '../../../students/entities/student.entity';
import { SchoolChargeDetails } from '../../school-charges-details/entities/school-charge-details.entity';
import { MiniStoreInvoice } from '../../../../mini-store/mini-store-invoices/entities/mini-store-invoice.entity';
import { SchoolChargesInvoice } from '../../school-charges-invoice/entities/school-charges-invoice.entity';

@Entity('school_charges')
export class SchoolCharge extends Base {

    @Column('varchar', {
        nullable: false,
        length: 40,
        default: '000000000000000',
        name: 'folio',
    })
    folio: string;

    @Column('text', {
        nullable: true,
    })
    observations: string | null;

    @Column('timestamp', {
        nullable: true,
    })
    dateCancellation: Date | null;

    @Column('text', {
        nullable: true,
    })
    reasonsCancellation: string | null;

    @Column('int', {
        nullable: false,
    })
    iva: number;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    change: number;

    @ManyToOne(() => Campus, (campus) => campus.campusSchoolCharge)
    schoolCampus: Campus;

    @ManyToOne(() => Cycle, (cycle) => cycle.cycleSchoolCharge)
    schoolCycle: Cycle;

    @ManyToOne(() => User, (user) => user.schoolCharges)
    cashier: User;

    @ManyToOne(() => User, (user) => user.schoolChargesCancellation)
    cashierCancellation: User;

    @ManyToOne(() => Student, (student) => student.studentCharges)
    schoolStudent: Student;

    @OneToMany(() => SchoolChargeDetails, (details) => details.schoolCharge)
    schoolChargesDetails: SchoolChargeDetails[];

    @OneToMany(() => SchoolChargeDetails, (details) => details.schoolCharge)
    schoolChargesPayments: SchoolChargeDetails[];

    @OneToMany(() => SchoolChargesInvoice, (schoolChargesInvoice) => schoolChargesInvoice.schoolCharge)
    schoolChargesInvoice: SchoolChargesInvoice[];
}
