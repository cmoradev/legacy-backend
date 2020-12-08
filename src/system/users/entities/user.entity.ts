import {
    Column,
    Entity, ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreInvoice } from '../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreWarehouseOrder } from '../../../mini-store/mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { ClassroomPermission } from '../../../school-colegio-ingles/classroom-permission/entities/classroom-permission.entity';
import { Inscription } from '../../../school-colegio-ingles/inscriptions/entities/inscription.entity';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { Role } from '../../roles/entities/role.entity';
import { Department } from '../../departments/entities/department.entity';
import { Teacher } from '../../../school-colegio-ingles/teachers/entities/teacher.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { SalesReturns } from '../../../mini-store/store-sales/mini-store-sales-returns/entities/sales-returns.entity';
import { SchoolCharge } from '../../../school-colegio-ingles/charges-school/school-charges/entities/school-charge.entity';
import { SchoolChargePayment } from '../../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { SchoolChargesInvoice } from '../../../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { MiniStoreTransaction } from '../../../mini-store/store-sales/mini-store-transaction/entities/mini-store-transaction.entity';
import { CashRegisterTransaction } from '../../../mini-store/cash-register-transactions/entities/cash-register-transaction.entity';
import { CashRegister } from '../../../mini-store/cash-register/entities/cash-register.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { AcademyChargeInvoice } from '../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { AcademyChargePayments } from '../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('usuarios')
export class User extends Base {

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'ap_paterno',
        default: () => '\'\'',
    })
    lastnameFather: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'ap_materno',
        default: () => '\'\'',
    })
    lastnameMother: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'email',
    })
    email: string;

    @Column('varchar', {
        nullable: false,
        name: 'password',
    })
    password: string;

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'remember_token',
    })
    rememberToken: string | null;

    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_departamento',
    })
    idDepartment: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_rol',
    })
    idRole: number;

    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: number;

    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'img',
    })
    img: string | null;

    @Column({
        type: 'tinyint',
        default: () => '\'0\'',
    })
    canAccessAnecdoticos: boolean;

    @OneToOne(() => Teacher, (teacher) => teacher.user)
    teacher: Teacher;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @ManyToOne(() => Department, (department) => department.users)
    department: Department;

    @ManyToOne(() => BranchOffice, (campus) => campus.users)
    campus: BranchOffice;

    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.agentBilling)
    miniStoreBillingInvoices: MiniStoreInvoice[];

    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.agentCanceling)
    miniStoreCancelingInvoices: MiniStoreInvoice[];

    @OneToMany(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.agentBilling)
    miniStoreBillingSales: MiniStoreSale[];

    @OneToMany(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.agentCanceling)
    miniStoreCancelingSales: MiniStoreSale[];

    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.agentBilling)
    miniStoreBillingPayments: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.agentCanceling)
    miniStoreCancelingPayments: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.agentCreator)
    miniStoreCreatorWareHouseOrder: MiniStoreWarehouseOrder[];

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.agentEditor)
    miniStoreEditorWareHouseOrder: MiniStoreWarehouseOrder[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripAgentCreator)
    userCchoolCreatorInscription: Inscription[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripAgentEditor)
    userCchoolEditorInscription: Inscription[];

    @OneToMany(() => ClassroomPermission, (classroomPermission) => classroomPermission.user)
    classroomPermissions: ClassroomPermission[];

    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.enrollmentAgent)
    userAcInsHigh: AcademyInscription[];

    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.unEnrollerAgent)
    userAcInsDown: AcademyInscription[];

    @OneToMany(type => SalesReturns, saleReturns => saleReturns.agent)
    salesReturns: SalesReturns[];

    @OneToMany(type => MiniStoreSalePayment, mssp => mssp.agent)
    salePayments: MiniStoreSalePayment[];

    @OneToMany(type => MiniStoreSale, (ms) => ms.cashier)
    sales: MiniStoreSale[];

    @OneToMany(type => MiniStoreTransaction, (ms) => ms.transactionUser)
    miniStoreTransaction: MiniStoreTransaction[];

    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.cashier)
    schoolCharges: SchoolCharge[];

    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.cashier)
    academyCharges: AcademyCharge[];

    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.cashier)
    schoolChargesCancellation: SchoolCharge[];

    @OneToMany(() => AcademyChargePayments, (schoolCharge) => schoolCharge.cashierCharge)
    academyChargesPayments: AcademyChargePayments[];

    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.cashier)
    academyChargesCancellation: AcademyCharge[];

    @OneToMany(() => SchoolChargePayment, (schoolCharge) => schoolCharge.cashierCharge)
    schoolChargesPayments: SchoolChargePayment[];

    @OneToMany(() => SchoolChargePayment, (schoolCharge) => schoolCharge.cashierChargeCancellation)
    chargesPaymentsCancellation: SchoolChargePayment[];

    @OneToMany(() => SchoolChargesInvoice, (miniStoreInvoice) => miniStoreInvoice.agentBilling)
    schoolChargesBillingInvoices: SchoolChargesInvoice[];

    @OneToMany(() => SchoolChargesInvoice, (miniStoreInvoice) => miniStoreInvoice.agentCanceling)
    schoolChargesCancelingInvoices: SchoolChargesInvoice[];

    @OneToMany(type => CashRegisterTransaction, cashRegisterTransaction => cashRegisterTransaction.agent)
    cashRegisterTransactions: CashRegisterTransaction[];

    @OneToMany(type => CashRegister, (cashRegister) => cashRegister.agent)
    cashRegisterHistory: CashRegister[];

    @OneToMany(() => AcademyChargeInvoice, (academyChargeInvoice) => academyChargeInvoice.agentBilling)
    academyChargesBillingInvoices: AcademyChargeInvoice[];

    @OneToMany(() => AcademyChargeInvoice, (academyChargeInvoice) => academyChargeInvoice.agentCanceling)
    academyChargesCancelingInvoices: AcademyChargeInvoice[];
}
