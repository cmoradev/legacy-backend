import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('usuarios')
export class User extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'ap_paterno',
        default: () => '\'\'',
    })
    lastnameFather: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'ap_materno',
        default: () => '\'\'',
    })
    lastnameMother: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'email',
    })
    email: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        name: 'password',
    })
    password: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'remember_token',
    })
    rememberToken: string | null;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_departamento',
    })
    idDepartment: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_rol',
    })
    idRole: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: number;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'img',
    })
    img: string | null;

    @Field(type => Int)
    @Column({
        type: 'tinyint',
        default: () => '\'0\'',
    })
    canAccessAnecdoticos: boolean;

    @Field(type => Teacher)
    @OneToOne(() => Teacher, (teacher) => teacher.user)
    teacher: Teacher;

    @Field(type => Role)
    @ManyToOne(() => Role, (role) => role.users, {
        cascade: ['insert'],
    })
    role: Role;

    @Field(type => Department)
    @ManyToOne(() => Department, (department) => department.users, {
        cascade: ['insert'],
    })
    department: Department;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.users, {
        cascade: ['insert'],
    })
    campus: BranchOffice;

    @Field(type => [MiniStoreInvoice])
    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.agentBilling)
    miniStoreBillingInvoices: MiniStoreInvoice[];

    @Field(type => [MiniStoreInvoice])
    @OneToMany(() => MiniStoreInvoice, (miniStoreInvoice) => miniStoreInvoice.agentCanceling)
    miniStoreCancelingInvoices: MiniStoreInvoice[];

    @Field(type => [MiniStoreSale])
    @OneToMany(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.agentBilling)
    miniStoreBillingSales: MiniStoreSale[];

    @Field(type => [MiniStoreSale])
    @OneToMany(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.agentCanceling)
    miniStoreCancelingSales: MiniStoreSale[];

    @Field(type => [MiniStoreSalePayment])
    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.agentBilling)
    miniStoreBillingPayments: MiniStoreSalePayment[];

    @Field(type => [MiniStoreSalePayment])
    @OneToMany(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.agentCanceling)
    miniStoreCancelingPayments: MiniStoreSalePayment[];

    @Field(type => [MiniStoreWarehouseOrder])
    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.agentCreator)
    miniStoreCreatorWareHouseOrder: MiniStoreWarehouseOrder[];

    @Field(type => [MiniStoreWarehouseOrder])
    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.agentEditor)
    miniStoreEditorWareHouseOrder: MiniStoreWarehouseOrder[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripAgentCreator)
    userCchoolCreatorInscription: Inscription[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripAgentEditor)
    userCchoolEditorInscription: Inscription[];

    @Field(type => [ClassroomPermission])
    @OneToMany(() => ClassroomPermission, (classroomPermission) => classroomPermission.user)
    classroomPermissions: ClassroomPermission[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.enrollmentAgent)
    userAcInsHigh: AcademyInscription[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.unEnrollerAgent)
    userAcInsDown: AcademyInscription[];

    @Field(type => [SalesReturns])
    @OneToMany(type => SalesReturns, saleReturns => saleReturns.agent)
    salesReturns: SalesReturns[];

    @Field(type => [MiniStoreSalePayment])
    @OneToMany(type => MiniStoreSalePayment, mssp => mssp.agent)
    salePayments: MiniStoreSalePayment[];

    @Field(type => [MiniStoreSale])
    @OneToMany(type => MiniStoreSale, (ms) => ms.cashier)
    sales: MiniStoreSale[];

    @Field(type => [MiniStoreTransaction])
    @OneToMany(type => MiniStoreTransaction, (ms) => ms.transactionUser)
    miniStoreTransaction: MiniStoreTransaction[];

    @Field(type => [SchoolCharge])
    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.cashier)
    schoolCharges: SchoolCharge[];

    @Field(type => [AcademyCharge])
    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.cashier)
    academyCharges: AcademyCharge[];

    @Field(type => [SchoolCharge])
    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.cashier)
    schoolChargesCancellation: SchoolCharge[];

    @Field(type => [AcademyChargePayments])
    @OneToMany(() => AcademyChargePayments, (schoolCharge) => schoolCharge.cashierCharge)
    academyChargesPayments: AcademyChargePayments[];

    @Field(type => [AcademyCharge])
    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.cashier)
    academyChargesCancellation: AcademyCharge[];

    @Field(type => [SchoolChargePayment])
    @OneToMany(() => SchoolChargePayment, (schoolCharge) => schoolCharge.cashierCharge)
    schoolChargesPayments: SchoolChargePayment[];

    @Field(type => [SchoolChargePayment])
    @OneToMany(() => SchoolChargePayment, (schoolCharge) => schoolCharge.cashierChargeCancellation)
    chargesPaymentsCancellation: SchoolChargePayment[];

    @Field(type => [SchoolChargesInvoice])
    @OneToMany(() => SchoolChargesInvoice, (miniStoreInvoice) => miniStoreInvoice.agentBilling)
    schoolChargesBillingInvoices: SchoolChargesInvoice[];

    @Field(type => [SchoolChargesInvoice])
    @OneToMany(() => SchoolChargesInvoice, (miniStoreInvoice) => miniStoreInvoice.agentCanceling)
    schoolChargesCancelingInvoices: SchoolChargesInvoice[];

    @Field(type => [CashRegisterTransaction])
    @OneToMany(type => CashRegisterTransaction, cashRegisterTransaction => cashRegisterTransaction.agent)
    cashRegisterTransactions: CashRegisterTransaction[];

    @Field(type => [CashRegister])
    @OneToMany(type => CashRegister, (cashRegister) => cashRegister.agent)
    cashRegisterHistory: CashRegister[];

    @Field(type => [AcademyChargeInvoice])
    @OneToMany(() => AcademyChargeInvoice, (academyChargeInvoice) => academyChargeInvoice.agentBilling)
    academyChargesBillingInvoices: AcademyChargeInvoice[];

    @Field(type => [AcademyChargeInvoice])
    @OneToMany(() => AcademyChargeInvoice, (academyChargeInvoice) => academyChargeInvoice.agentCanceling)
    academyChargesCancelingInvoices: AcademyChargeInvoice[];
}
