import {
  Column,
  Entity, ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreInvoice } from '../../../mini-store/mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreSale } from '../../../mini-store/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreWarehouseOrder } from '../../../mini-store/mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { ClassroomPermission } from '../../../school-colegio-ingles/classroom-permission/entities/classroom-permission.entity';
import { Inscription } from '../../../school-colegio-ingles/inscriptions/entities/inscription.entity';
import { Campus } from '../../../school-colegio-ingles/campuses/entities/campus.entity';
import { Role } from '../../roles/entities/role.entity';
import { Department } from '../../departments/entities/department.entity';
import { Teacher } from '../../../school-colegio-ingles/teachers/entities/teacher.entity';

@Entity('usuarios')
export class User {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

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

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @ManyToOne(() => Campus, (campus) => campus.users)
  campus: Campus;

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

}
