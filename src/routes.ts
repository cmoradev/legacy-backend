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
import { CampusesModule } from './school-colegio-ingles/campuses/campuses.module';
import { FamiliesModule } from './school-colegio-ingles/families/families.module';
import { MiniStoreModule } from './mini-store/mini-store.module';
import { MiniStoreProductsModule } from './mini-store/mini-store-products/mini-store-products.module';
import { MiniStoreClassificationsModule } from './mini-store/mini-store-classifications/mini-store-classifications.module';
import { MiniStorePricesListsModule } from './mini-store/mini-store-prices-lists/mini-store-prices-lists.module';
import { MiniStoreInvoicesKeysModule } from './mini-store/mini-store-invoices-keys/mini-store-invoices-keys.module';
import { MiniStoreInvoicesModule } from './mini-store/mini-store-invoices/mini-store-invoices.module';
import { AssignmentsSubjectsModule } from './school-colegio-ingles/assignments-subjects/assignments-subjects.module';
import { MiniStoreSalesModule } from './mini-store/mini-store-sales/mini-store-sales.module';
import { SystemPaymentsStatusModule } from './system/system-payments-status/system-payments-status.module';
import { MiniStoreSalesPaymentsModule } from './mini-store/mini-store-sales-payments/mini-store-sales-payments.module';
import { MiniStoreSalesMethodsPaymentsModule } from './mini-store/mini-store-sales-methods-payments/mini-store-sales-methods-payments.module';
import { MiniStoreSalesDetailsModule } from './mini-store/mini-store-sales-details/mini-store-sales-details.module';
import { MiniStoreWarehouseOrdersModule } from './mini-store/mini-store-warehouse-orders/mini-store-warehouse-orders.module';
import { MiniStoreWarehouseOrdersProductsModule } from './mini-store/mini-store-warehouse-orders-products/mini-store-warehouse-orders-products.module';
import { MiniStoreWarehouseProvidersModule } from './mini-store/mini-store-warehouse-providers/mini-store-warehouse-providers.module';
import { ClassroomsModule } from './school-colegio-ingles/classrooms/classrooms.module';
import { RoutesModule } from './system/routes/routes.module';
import { PermissionsModule } from './system/permissions/permissions.module';
import { RolesModule } from './system/roles/roles.module';
import { ActionsModule } from './school-colegio-ingles/actions/actions.module';
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
import { InvoicesMethodsPaymentsModule } from './system/invoices-methods-payments/invoices-methods-payments.module';
import { InvoicesBankModule } from './system/invoices-bank/invoices-bank.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ClassificationsModule } from './fixed-assets-control/classifications/classifications.module';
import { LocationsModule } from './fixed-assets-control/locations/locations.module';
import { CountriesModule } from './system/countries/countries.module';
import { StatesModule } from './system/states/states.module';
import { CitiesModule } from './system/cities/cities.module';
import { MunicipalitiesModule } from './system/municipalities/municipalities.module';
import { SystemModule } from './system/system.module';
import { AcademyModule } from './academy/academy.module';
import { AcademyModalitiesModule } from './academy/academy-modalities/academy-modalities.module';
import { AcademyActivitiesModule } from './academy/academy-activities/academy-activities.module';
import { AcademyConceptsModule } from './academy/academy-concepts/academy-concepts.module';
import { MiniStoreDashBoardModule } from './mini-store/mini-store-dash-board/mini-store-dash-board.module';
import { SystemDashBoardModule } from './system/system-dash-board/system-dash-board.module';
import { AcademyDashBoardModule } from './academy/academy-dash-board/academy-dash-board.module';
import { UsersModule } from './system/users/users.module';

export const routes: Routes = [
  {
    path: '/invoice',
    module: InvoiceModule,
  },
  {
    path: '/system',
    module: SystemModule,
    children: [
      { path: '/dashboard', module: SystemDashBoardModule },
      { path: '/users', module: UsersModule },
      { path: '/routes', module: RoutesModule },
      { path: '/permissions', module: PermissionsModule },
      { path: '/auth', module: AuthModule },
      { path: '/roles', module: RolesModule },
      { path: '/departments', module: DepartmentsModule },
      { path: '/actions', module: ActionsModule },
      { path: '/invoices-methods-payments', module: InvoicesMethodsPaymentsModule },
      { path: '/invoices-bank', module: InvoicesBankModule },
      { path: '/countries', module: CountriesModule },
      { path: '/states', module: StatesModule },
      { path: '/cities', module: CitiesModule },
      { path: '/municipalities', module: MunicipalitiesModule },
      { path: '/payments-status', module: SystemPaymentsStatusModule },
    ],
  },
  {
    path: '/school',
    module: SchoolColegioInglesModule,
    children: [
      { path: '/dashboard', module: SystemDashBoardModule },
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
      { path: '/campuses', module: CampusesModule },
      { path: '/families', module: FamiliesModule },
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
      { path: '/products', module: MiniStoreProductsModule },
      { path: '/classifications', module: MiniStoreClassificationsModule },
      { path: '/prices-lists', module: MiniStorePricesListsModule },
      { path: '/invoices-keys', module: MiniStoreInvoicesKeysModule },
      { path: '/invoices', module: MiniStoreInvoicesModule },
      { path: '/sales', module: MiniStoreSalesModule },
      { path: '/sales-payments', module: MiniStoreSalesPaymentsModule },
      { path: '/sales-methods-payments', module: MiniStoreSalesMethodsPaymentsModule },
      { path: '/sales-details', module: MiniStoreSalesDetailsModule },
      {
        path: '/warehouse', children: [
          { path: '/orders', module: MiniStoreWarehouseOrdersModule },
          { path: '/orders-products', module: MiniStoreWarehouseOrdersProductsModule },
          { path: '/providers', module: MiniStoreWarehouseProvidersModule },

        ],
      },
    ],
  },
  {
    path: '/academies',
    module: AcademyModule,
    children: [
      { path: '/dashboard', module: AcademyDashBoardModule },
      { path: '/academy-activities', module: AcademyActivitiesModule },
      { path: '/academy-concepts', module: AcademyConceptsModule },
      { path: '/academy-modalities', module: AcademyModalitiesModule },
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
  },
];
