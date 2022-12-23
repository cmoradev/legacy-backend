import { Routes } from 'nest-router';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { SubjectsModule } from './school-colegio-ingles/subjects/subjects.module';
import { StudyPlansModule } from './school-colegio-ingles/study-plans/study-plans.module';
import { StudyPlanVariantsModule } from './school-colegio-ingles/study-plan-variants/study-plan-variants.module';
import { LevelsModule } from './school-colegio-ingles/levels/levels.module';
import { GradesModule } from './school-colegio-ingles/grades/grades.module';
import { StudentsModule } from './school-colegio-ingles/students/students.module';
import { AssignmentsModule } from './school-colegio-ingles/assignments/assignments.module';
import { ModalitiesModule } from './school-colegio-ingles/modalities/modalities.module';
import { TeachersModule } from './school-colegio-ingles/teachers/teachers.module';
import { GroupsModule } from './school-colegio-ingles/groups/groups.module';
import { InscriptionsModule } from './school-colegio-ingles/inscriptions/inscriptions.module';
import { CyclesModule } from './school-colegio-ingles/cycles/cycles.module';
import { BranchOfficeModule } from './system/branch-office/branch-office.module';
import { FamiliesModule } from './school-colegio-ingles/families/families.module';
import { MiniStoreModule } from './mini-store/mini-store.module';
import { MiniStoreProductsModule } from './mini-store/mini-store-products/mini-store-products.module';
import { MiniStoreClassificationsModule } from './mini-store/mini-store-classifications/mini-store-classifications.module';
import { MiniStorePricesListsModule } from './mini-store/mini-store-prices-lists/mini-store-prices-lists.module';
import { MiniStoreInvoicesModule } from './mini-store/store-sales/mini-store-invoices/mini-store-invoices.module';
import { AssignmentsSubjectsModule } from './school-colegio-ingles/assignments-subjects/assignments-subjects.module';
import { MiniStoreSalesModule } from './mini-store/store-sales/mini-store-sales/mini-store-sales.module';
import { SystemPaymentsStatusModule } from './system/system-payments-status/system-payments-status.module';
import { MiniStoreSalesPaymentsModule } from './mini-store/store-sales/mini-store-sales-payments/mini-store-sales-payments.module';
import { MiniStoreSalesMethodsPaymentsModule } from './mini-store/store-sales/mini-store-sales-methods-payments/mini-store-sales-methods-payments.module';
import { MiniStoreSalesDetailsModule } from './mini-store/store-sales/mini-store-sales-details/mini-store-sales-details.module';
import { MiniStoreWarehouseOrdersModule } from './mini-store/mini-store-warehouse-orders/mini-store-warehouse-orders.module';
import { MiniStoreWarehouseOrdersProductsModule } from './mini-store/mini-store-warehouse-orders-products/mini-store-warehouse-orders-products.module';
import { MiniStoreWarehouseProvidersModule } from './mini-store/mini-store-warehouse-providers/mini-store-warehouse-providers.module';
import { ClassroomsModule } from './school-colegio-ingles/classrooms/classrooms.module';
import { RoutesModule } from './system/routes/routes.module';
import { PermissionsModule } from './system/permissions/permissions.module';
import { RolesModule } from './system/roles/roles.module';
import { ActionsModule } from './system/actions/actions.module';
import { AssignmentIncriptionModule } from './school-colegio-ingles/assignment-incription/assignment-incription.module';
import { ClassroomPermissionModule } from './school-colegio-ingles/classroom-permission/classroom-permission.module';
import { IncidentClassificationModule } from './school-colegio-ingles/incident-classification/incident-classification.module';
import { IncidentsModule } from './school-colegio-ingles/incidents/incidents.module';
import { DepartmentsModule } from './system/departments/departments.module';
import { CheckInModule } from './school-colegio-ingles/check-in/check-in.module';
import { AuthModule } from './system/auth/auth.module';
import { FixedAssetsControlModule } from './fixed-assets-control/fixed-assets-control.module';
import { MatrixCompaniesModule } from './fixed-assets-control/matrix-companies/matrix-companies.module';
import { BranchCompaniesModule } from './fixed-assets-control/branch-companies/branch-companies.module';
import { EmployeesModule } from './fixed-assets-control/employees/employees.module';
import { FixedAssetsModule } from './fixed-assets-control/fixed-assets/fixed-assets.module';
import { FixedAssetsAssignmentsModule } from './fixed-assets-control/fixed-assets-assignments/fixed-assets-assignments.module';
import { JobPositionsModule } from './fixed-assets-control/job-positions/job-positions.module';
import { ResponsiveLettersModule } from './fixed-assets-control/responsive-letters/responsive-letters.module';
import { InvoicesBankModule } from './system/invoices-bank/invoices-bank.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ClassificationsModule } from './fixed-assets-control/classifications/classifications.module';
import { LocationsModule } from './fixed-assets-control/locations/locations.module';
import { SystemModule } from './system/system.module';
import { AcademyModule } from './academy/academy.module';
import { AcademyModalitiesModule } from './academy/academy-modalities/academy-modalities.module';
import { AcademyActivitiesModule } from './academy/academy-activities/academy-activities.module';
import { AcademyConceptsModule } from './academy/academy-concepts/academy-concepts.module';
import { MiniStoreDashBoardModule } from './mini-store/mini-store-dash-board/mini-store-dash-board.module';
import { AcademyDashBoardModule } from './academy/academy-dash-board/academy-dash-board.module';
import { UsersModule } from './system/users/users.module';
import { InvoiceMethodsPaymentsModule } from './invoice/invoice-methods-payments/invoice-methods-payments.module';
import { SystemConceptsTypeModule } from './system/system-concepts-type/system-concepts-type.module';
import { AcademyActivitiesGroupModule } from './academy/academy-activities-group/academy-activities-group.module';
import { ShiftModule } from './system/shift/shift.module';
import { SystemExtraChargesModule } from './system/system-extra-charges/system-extra-charges.module';
import { SystemTypeExtraChargesModule } from './system/system-type-extra-charges/system-type-extra-charges.module';
import { AcademyInscriptionModule } from './academy/academy-inscription/academy-inscription.module';
import { InscriptionStatusModule } from './system/inscription-status/inscription-status.module';
import { AcademyInscriptionConceptsModule } from './academy/academy-inscription-concepts/academy-inscription-concepts.module';
import { AcademyChargeDetailsModule } from './academy/charges-academy/academy-charge-details/academy-charge-details.module';
import { AcademyChargeDiscountsModule } from './academy/charges-academy/academy-charge-discounts/academy-charge-discounts.module';
import { AcademyChargeInvoiceModule } from './academy/charges-academy/academy-charge-invoice/academy-charge-invoice.module';
import { AcademyChargeSurchargesModule } from './academy/charges-academy/academy-charge-surcharges/academy-charge-surcharges.module';
import { AcademyChargeWayOfPayingModule } from './academy/charges-academy/academy-charge-way-of-paying/academy-charge-way-of-paying.module';
import { AcademyChargeModule } from './academy/charges-academy/academy-charge/academy-charge.module';
import { BranchOfficeSettingModule } from './system/branch-office-setting/branch-office-setting.module';
import { PaymentPlansModule } from './school-colegio-ingles/payment-plans/payment-plans.module';
import { PaymentPlanConceptsModule } from './school-colegio-ingles/payment-plan-concepts/payment-plan-concepts.module';
import { SchoolPaymentsModule } from './school-colegio-ingles/school-payments/school-payments.module';
import { PeriodsModule } from './school-colegio-ingles/periods/periods.module';
import { ChargesSchoolModule } from './school-colegio-ingles/charges-school/charges-school.module';
import { SchoolChargesModule } from './school-colegio-ingles/charges-school/school-charges/school-charges.module';
import { SchoolChargesDetailsModule } from './school-colegio-ingles/charges-school/school-charges-details/school-charges-details.module';
import { SchoolChargesInvoiceModule } from './school-colegio-ingles/charges-school/school-charges-invoice/school-charges-invoice.module';
import { SchoolChargesMethodsPaymentsModule } from './school-colegio-ingles/charges-school/school-charges-methods-payments/school-charges-methods-payments.module';
import { SchoolChargesPaymentsModule } from './school-colegio-ingles/charges-school/school-charges-payments/school-charges-payments.module';
import { StatsModule } from './system/stats/stats.module';
import { MiniStoreProductsProvidersModule } from './mini-store/mini-store-products-providers/mini-store-products-providers.module';
import { SettingsModule } from './system/settings/settings.module';
import { MiniStoreTransactionModule } from './mini-store/store-sales/mini-store-transaction/mini-store-transaction.module';
import { CashRegisterModule } from './mini-store/cash-register/cash-register.module';
import { CashRegisterTransactionsModule } from './mini-store/cash-register-transactions/cash-register-transactions.module';
import { FoliosModule } from './system/folios/folios.module';
import { ChargesAcademyModule } from './academy/charges-academy/charges-academy.module';
import { AcademyChargeDetailsExtraChargeModule } from './academy/charges-academy/academy-charge-details-extra-charge/academy-charge-details-extra-charge.module';
import { SchoolChargesDetailsExtraChargesModule } from './school-colegio-ingles/charges-school/school-charges-details-extra-charges/school-charges-details-extra-charges.module';
import { AcademyChargeMethodsPaymentsModule } from './academy/charges-academy/academy-charge-methods-payments/academy-charge-methods-payments.module';
import { AcademyChargePaymentsModule } from './academy/charges-academy/academy-charge-payments/academy-charge-payments.module';
import { AcademyInscriptionChargesModule } from './academy/academy-inscription-concept-charges/academy-inscription-charges.module';
import { FamilyFiscalModule } from './school-colegio-ingles/family-fiscal/family-fiscal.module';
import { XlsImporterModule } from './xls-importer/xls-importer.module';
import { RouteActionModule } from './system/route-action/route-action.module';
import { SchoolPaymentsChargesModule } from './school-colegio-ingles/school-payments-charges/school-payments-charges.module';
import { TransactionModule } from './system/transaction/transactions.module';
import { IdentifierModule } from './system/identifier/identifier.module';

// eliminar al cambiar los reporte del front
import { MiniStoreSalesReturnsModule } from './mini-store/store-sales/mini-store-sales-returns/mini-store-sales-returns.module';

export const routes: Routes = [
    {
        path: '/invoice',
        module: InvoiceModule,
        children: [
            {
                path: '/companies',
                module: BranchOfficeSettingModule,
            },
        ],
    },
    {
        path: '/system',
        module: SystemModule,
        children: [
            { path: '/users', module: UsersModule },
            { path: '/routes', module: RoutesModule },
            { path: '/route-action', module: RouteActionModule },
            { path: '/roles', module: RolesModule },
            { path: '/permissions', module: PermissionsModule },
            { path: '/actions', module: ActionsModule },
            { path: '/auth', module: AuthModule },
            { path: '/departments', module: DepartmentsModule },
            { path: '/invoices-methods-payments', module: InvoiceMethodsPaymentsModule },
            { path: '/invoices-bank', module: InvoicesBankModule },
            { path: '/payments-status', module: SystemPaymentsStatusModule },
            { path: '/inscription-status', module: InscriptionStatusModule },
            { path: '/concepts-type', module: SystemConceptsTypeModule },
            { path: '/shift', module: ShiftModule },
            { path: '/extra-charges', module: SystemExtraChargesModule },
            { path: '/type-extra-charges', module: SystemTypeExtraChargesModule },
            { path: '/stats', module: StatsModule },
            { path: '/settings', module: SettingsModule },
            { path: '/folios', module: FoliosModule },
            { path: '/xls', module: XlsImporterModule },
            { path: '/transaction', module: TransactionModule },
            { path: '/identifier', module: IdentifierModule }
        ],
    },
    {
        path: '/school',
        module: SchoolColegioInglesModule,
        children: [
            {
                path: '/charges',
                module: ChargesSchoolModule,
                children: [
                    { path: '/charge', module: SchoolChargesModule },
                    { path: '/details', module: SchoolChargesDetailsModule },
                    { path: '/details-extra-charge', module: SchoolChargesDetailsExtraChargesModule },
                    { path: '/invoice', module: SchoolChargesInvoiceModule },
                    { path: '/payments', module: SchoolChargesPaymentsModule },
                    { path: '/methods-payment', module: SchoolChargesMethodsPaymentsModule },
                ],
            },
            { path: '/school-payments', module: SchoolPaymentsModule },
            { path: '/school-payments/charges', module: SchoolPaymentsChargesModule },
            { path: '/payment-plans', module: PaymentPlansModule },
            { path: '/payment-plan-concepts', module: PaymentPlanConceptsModule },
            { path: '/subjects', module: SubjectsModule },
            { path: '/study-plans', module: StudyPlansModule },
            { path: '/study-plan-variants', module: StudyPlanVariantsModule },
            { path: '/levels', module: LevelsModule },
            { path: '/grades', module: GradesModule },
            { path: '/students', module: StudentsModule },
            { path: '/assignments', module: AssignmentsModule },
            { path: '/modalities', module: ModalitiesModule },
            { path: '/teachers', module: TeachersModule },
            { path: '/assignments-subjects', module: AssignmentsSubjectsModule },
            { path: '/groups', module: GroupsModule },
            { path: '/inscriptions', module: InscriptionsModule },
            { path: '/assignments-inscriptions', module: AssignmentIncriptionModule },
            { path: '/cycles', module: CyclesModule },
            { path: '/periods', module: PeriodsModule },
            { path: '/campuses', module: BranchOfficeModule },
            { path: '/families', module: FamiliesModule },
            { path: '/family-business-name', module: FamilyFiscalModule },
            { path: '/classrooms', module: ClassroomsModule },
            { path: '/classrooms-permissions', module: ClassroomPermissionModule },
            { path: '/incident-classifications', module: IncidentClassificationModule },
            { path: '/incidents', module: IncidentsModule },
            { path: '/check-in', module: CheckInModule },
        ],
    },
    {
        path: '/mini-store',
        module: MiniStoreModule,
        children: [
            {
                path: '/dash-board',
                module: MiniStoreDashBoardModule,
                children: [],
            },
            { path: '/transaction', module: MiniStoreTransactionModule },
            { path: '/cash-register', module: CashRegisterModule },
            { path: '/cash-register-transactions', module: CashRegisterTransactionsModule },
            { path: '/products', module: MiniStoreProductsModule },
            { path: '/classifications', module: MiniStoreClassificationsModule },
            { path: '/prices-lists', module: MiniStorePricesListsModule },
            { path: '/sales', module: MiniStoreSalesModule },
            { path: '/sales-payments', module: MiniStoreSalesPaymentsModule },
            { path: '/sales-methods-payments', module: MiniStoreSalesMethodsPaymentsModule },
            { path: '/sales-details', module: MiniStoreSalesDetailsModule },
            { path: '/invoices', module: MiniStoreInvoicesModule },
            { path: '/products-providers', module: MiniStoreProductsProvidersModule },
            {
                path: '/warehouse', children: [
                    { path: '/orders', module: MiniStoreWarehouseOrdersModule },
                    { path: '/orders-products', module: MiniStoreWarehouseOrdersProductsModule },
                    { path: '/providers', module: MiniStoreWarehouseProvidersModule },

                ],
            },
            { path: '/sales-returns', module: MiniStoreSalesReturnsModule },
        ],
    },
    {
        path: '/academies',
        module: AcademyModule,
        children: [
            { path: '/dashboard', module: AcademyDashBoardModule },
            { path: '/academy-activities', module: AcademyActivitiesModule },
            { path: '/academy-activities-group', module: AcademyActivitiesGroupModule },
            { path: '/academy-concepts', module: AcademyConceptsModule },
            { path: '/academy-modalities', module: AcademyModalitiesModule },
            { path: '/academy-inscription', module: AcademyInscriptionModule },
            { path: '/academy-inscription-concepts', module: AcademyInscriptionConceptsModule },
            { path: '/academy-inscription-concepts/charges', module: AcademyInscriptionChargesModule },
            {
                path: '/charges',
                module: ChargesAcademyModule,
                children: [
                    { path: '/charge', module: AcademyChargeModule },
                    { path: '/details', module: AcademyChargeDetailsModule },
                    { path: '/details-extra-charge', module: AcademyChargeDetailsExtraChargeModule },
                    { path: '/invoice', module: AcademyChargeInvoiceModule },
                    { path: '/payments', module: AcademyChargePaymentsModule },
                    { path: '/methods-payment', module: AcademyChargeMethodsPaymentsModule },

                    { path: '/discounts', module: AcademyChargeDiscountsModule },
                    { path: '/surcharges', module: AcademyChargeSurchargesModule },
                    { path: '/charge-way-of-paying', module: AcademyChargeWayOfPayingModule },
                    // { path: '/reports', module:AcademyChargeInvoiceModule},
                ],
            },
        ],
    },
    {
        path: '/fixed-assets-control',
        module: FixedAssetsControlModule,
        children: [
            { path: 'branch-companies', module: BranchCompaniesModule },
            { path: 'employees', module: EmployeesModule },
            { path: 'fixed-assets', module: FixedAssetsModule },
            { path: 'fixed-assets-assignments', module: FixedAssetsAssignmentsModule },
            { path: 'job-positions', module: JobPositionsModule },
            { path: 'matrix-companies', module: MatrixCompaniesModule },
            { path: 'responsive-letters', module: ResponsiveLettersModule },
            { path: 'classifications', module: ClassificationsModule },
            { path: 'locations', module: LocationsModule },

        ],
    }
];
