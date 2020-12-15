import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BranchType } from '../../../invoice/interface/FolioInvoice.interface';
import { Level } from '../../../school-colegio-ingles/levels/entities/level.entity';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';
import { Inscription } from '../../../school-colegio-ingles/inscriptions/entities/inscription.entity';
import { Family } from '../../../school-colegio-ingles/families/entities/family.entity';
import { User } from '../../users/entities/user.entity';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { SystemExtraCharges } from '../../system-extra-charges/entities/system-extra-charges.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { SchoolCharge } from '../../../school-colegio-ingles/charges-school/school-charges/entities/school-charge.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { BranchOfficeSetting } from '../../branch-office-setting/entities/branch-office-setting.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreProduct } from '../../../mini-store/mini-store-products/entities/mini-store-product.entity';
import { SchoolChargePayment } from '../../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargePayments } from '../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { MiniStoreClassification } from '../../../mini-store/mini-store-classifications/entities/mini-store-classification.entity';
import { MiniStorePriceList } from '../../../mini-store/mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreWarehouseOrder } from '../../../mini-store/mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { MiniStoreInvoice } from '../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { AcademyChargeInvoice } from '../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('planteles')
export class BranchOffice extends Base {

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'plantel',
    })
    name: string;

    @Column('int', {
        nullable: false,
        name: 'id_ubicacion',
    })
    idLocation: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'folio_order',
        default: 1,
    })
    FolioOrder: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'prefix_order',
        default: '',
    })
    PrefixOrder: string;

    @Column({
        type: 'simple-enum',
        nullable: false,
        name: 'branch_type',
        enum: BranchType,
        default: 1,
    })
    BranchType: BranchType;

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'email',
        default: '',
    })
    Email: string;

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'email_user',
        default: '',
    })
    UserEmail: string;

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'email_pass',
        default: '',
    })
    EmailPass: string;

    @OneToMany(() => Level, (level) => level.campus)
    levels: Level[];

    @OneToMany(() => Student, (student) => student.studentCampus)
    students: Student[];

    @OneToMany(() => BranchOfficeSetting, (invoice) => invoice.invoiceCampus)
    branchoffice: BranchOfficeSetting[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripCampus)
    campusInscriptions: Inscription[];

    @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsCampus)
    campusAcademyConcepts: AcademyConcepts[];

    @OneToMany(() => AcademyActivitiesGroup, (academygroup) => academygroup.academyGroupCampus)
    campusAcademyGroups: AcademyActivitiesGroup[];

    @OneToMany(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargesCampus)
    campusExtraCharges: SystemExtraCharges[];

    @OneToMany(() => Family, (family) => family.campus)
    families: Family[];

    @OneToMany(() => User, (user) => user.campus)
    users: User[];

    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.inscriptionCampus)
    campusAcIns: AcademyInscription[];

    @OneToMany(() => MiniStoreSale, (academyCharge) => academyCharge.storeBranchOffice)
    branchOfficeStore: MiniStoreSale[];

    @OneToMany(() => MiniStoreSalePayment, (academyCharge) => academyCharge.storePaymentOffice)
    branchOfficeStorePayment: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreInvoice, (academyCharge) => academyCharge.invoiceBranchOffice)
    branchOfficeStoreInvoice: MiniStoreInvoice[];

    @OneToMany(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.branchOffice)
    MiniStoreProduct: MiniStoreProduct[];

    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.schoolCampus)
    campusSchoolCharge: SchoolCharge[];

    @OneToMany(() => SchoolChargePayment, (school) => school.schoolPaymentOffice)
    branchOfficeSchoolPayment: SchoolChargePayment[];

    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.chargeCampus)
    campusAcademyCharge: AcademyCharge[];

    @OneToMany(() => AcademyChargePayments, (school) => school.academyPaymentOffice)
    branchOfficeAcademyPayment: AcademyChargePayments[];

    @OneToMany(() => AcademyChargeInvoice, (academyCharge) => academyCharge.invoiceBranchOffice)
    branchOfficeAcademyInvoice: AcademyChargeInvoice[];

    @OneToMany(() => MiniStoreClassification, (clafification) => clafification.branchOffice)
    MiniStoreClassification: MiniStoreClassification[];

    @OneToMany(() => MiniStorePriceList, (list) => list.branchOfficeList)
    BranchOfficeList: MiniStorePriceList[];

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.branchOfficeMiniStoreWherehouse)
    BranchOfficeWherehouseOrder: MiniStoreWarehouseOrder[];
}
