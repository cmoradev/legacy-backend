import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { Cycle } from '../../../cycles/entities/cycle.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { Student } from '../../../students/entities/student.entity';
import { SchoolChargesInvoice } from '../../school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolChargePayment } from '../../school-charges-payments/entities/school-charge-payment.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { SchoolChargeDetails } from '../../school-charges-details/entities/school-charge-details.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';

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

  @Column({
    type: 'timestamp',
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

  @Column({
    type: 'simple-enum',
    enum: PaymentStatus,
    default: PaymentStatus.Debit,
    nullable: false,
    name: 'status',
  })
  status: PaymentStatus;

  @ManyToOne(() => BranchOffice, (campus) => campus.campusSchoolCharge)
  schoolCampus: BranchOffice;

  @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSetSchool)
  schoolBranchOfficeSet: BranchOfficeSetting;

  @ManyToOne(() => Cycle, (cycle) => cycle.cycleSchoolCharge)
  schoolCycle: Cycle;

  @ManyToOne(() => User, (user) => user.schoolCharges)
  cashier: User;

  @ManyToOne(() => User, (user) => user.schoolChargesCancellation)
  cashierCancellation: User;

  @ManyToOne(() => Student, (student) => student.studentCharges)
  schoolStudent: Student;

  @OneToMany(() => SchoolChargeDetails, (details) => details.schoolCharge, {
    cascade: ['insert', 'update'],
  })
  chargesDetails: SchoolChargeDetails[];

  @OneToMany(() => SchoolChargePayment, (detailspay) => detailspay.schoolCharge, {
    cascade: ['insert'],
  })
  chargesPayments: SchoolChargePayment[];

  @OneToMany(() => SchoolChargesInvoice, (schoolChargesInvoice) => schoolChargesInvoice.schoolCharge,
    {
      cascade: ['insert'],
    })
  chargesInvoice: SchoolChargesInvoice[];
}
