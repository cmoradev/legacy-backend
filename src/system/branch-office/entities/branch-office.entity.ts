import { Column, Entity, OneToMany } from 'typeorm';
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

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('planteles')
export class BranchOffice extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'plantel',
    })
    name: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_ubicacion',
    })
    idLocation: number;

    @Field(type => Int)
    @Column({
        type: 'int',
        nullable: false,
        name: 'folio_order',
        default: 1,
    })
    FolioOrder: number;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        name: 'prefix_order',
        default: '',
    })
    PrefixOrder: string;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        name: 'branch_type',
        enum: BranchType,
        default: 1,
    })
    BranchType: BranchType;

    @Field({ nullable: true })
    @Column({
        type: 'varchar',
        nullable: true,
        name: 'email',
        default: '',
    })
    Email: string;

    @Field({ nullable: true })
    @Column({
        type: 'varchar',
        nullable: true,
        name: 'email_user',
        default: '',
    })
    UserEmail: string;

    @Field({ nullable: true })
    @Column({
        type: 'varchar',
        nullable: true,
        name: 'email_pass',
        default: '',
    })
    EmailPass: string;

    @Field(type => Level)
    @OneToMany(() => Level, (level) => level.campus)
    levels: Level[];

    @Field(type => [Student])
    @OneToMany(() => Student, (student) => student.studentCampus)
    students: Student[];

    @Field(type => [BranchOfficeSetting])
    @OneToMany(() => BranchOfficeSetting, (invoice) => invoice.invoiceCampus)
    branchoffice: BranchOfficeSetting[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripCampus)
    campusInscriptions: Inscription[];

    @Field(type => [AcademyConcepts])
    @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsCampus)
    campusAcademyConcepts: AcademyConcepts[];

    @Field(type => [AcademyActivitiesGroup])
    @OneToMany(() => AcademyActivitiesGroup, (academygroup) => academygroup.academyGroupCampus)
    campusAcademyGroups: AcademyActivitiesGroup[];

    @Field(type => [SystemExtraCharges])
    @OneToMany(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargesCampus)
    campusExtraCharges: SystemExtraCharges[];

    @Field(type => [Family])
    @OneToMany(() => Family, (family) => family.campus)
    families: Family[];

    @Field(type => [User])
    @OneToMany(() => User, (user) => user.campus)
    users: User[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.inscriptionCampus)
    campusAcIns: AcademyInscription[];

    @Field(type => [MiniStoreSale])
    @OneToMany(() => MiniStoreSale, (academyCharge) => academyCharge.storeBranchOffice)
    branchOfficeStore: MiniStoreSale[];

    @Field(type => [MiniStoreSalePayment])
    @OneToMany(() => MiniStoreSalePayment, (academyCharge) => academyCharge.storePaymentOffice)
    branchOfficeStorePayment: MiniStoreSalePayment[];

    @Field(type => [MiniStoreInvoice])
    @OneToMany(() => MiniStoreInvoice, (academyCharge) => academyCharge.invoiceBranchOffice)
    branchOfficeStoreInvoice: MiniStoreInvoice[];

    @Field(type => [MiniStoreProduct])
    @OneToMany(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.branchOffice)
    MiniStoreProduct: MiniStoreProduct[];

    @Field(type => [SchoolCharge])
    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.schoolCampus)
    campusSchoolCharge: SchoolCharge[];

    @Field(type => [SchoolChargePayment])
    @OneToMany(() => SchoolChargePayment, (school) => school.schoolPaymentOffice)
    branchOfficeSchoolPayment: SchoolChargePayment[];

    @Field(type => [AcademyCharge])
    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.chargeCampus)
    campusAcademyCharge: AcademyCharge[];

    @OneToMany(() => AcademyChargePayments, (school) => school.academyPaymentOffice)
    branchOfficeAcademyPayment: AcademyChargePayments[];

    @Field(type => [AcademyChargeInvoice])
    @OneToMany(() => AcademyChargeInvoice, (academyCharge) => academyCharge.invoiceBranchOffice)
    branchOfficeAcademyInvoice: AcademyChargeInvoice[];

    @Field(type => [MiniStoreClassification])
    @OneToMany(() => MiniStoreClassification, (clafification) => clafification.branchOffice)
    MiniStoreClassification: MiniStoreClassification[];

    @Field(type => [MiniStorePriceList])
    @OneToMany(() => MiniStorePriceList, (list) => list.branchOfficeList)
    BranchOfficeList: MiniStorePriceList[];

    @Field(type => [MiniStoreWarehouseOrder])
    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.branchOfficeMiniStoreWherehouse)
    BranchOfficeWherehouseOrder: MiniStoreWarehouseOrder[];
}
