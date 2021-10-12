import { Teacher } from '../../school-colegio-ingles/teachers/entities/teacher.entity';
import { User } from '../../system/users/entities/user.entity';
import { AcademyActivity } from '../../academy/academy-activities/entities/academy-activity.entity';
import { AcademyConcepts } from '../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { AcademyInscription } from '../../academy/academy-inscription/entities/academy-inscription.entity';
import { AcademyInscriptionConceptCharges } from '../../academy/academy-inscription-concept-charges/entites/academy-inscription-concept-charges.entity';
import { AcademyInscriptionConcepts } from '../../academy/academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { AcademiesModality } from '../../academy/academy-modalities/entities/academy-modality.entity';
import { AcademyCharge } from '../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { AcademyChargeDetailsExtraCharge } from '../../academy/charges-academy/academy-charge-details-extra-charge/entities/academy-charge-details-extra-charge.entity';
import { AcademyChargeDiscounts } from '../../academy/charges-academy/academy-charge-discounts/entities/academy-charge-discounts.entity';
import { AcademyChargeInvoice } from '../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { AcademyChargeMethodsPayments } from '../../academy/charges-academy/academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { AcademyChargeSurcharges } from '../../academy/charges-academy/academy-charge-surcharges/entities/academy-charge-surcharges.entity';
import { AcademyChargeWayOfPaying } from '../../academy/charges-academy/academy-charge-way-of-paying/entities/academy-charge-way-of-paying.entity';

import { Location } from '../../fixed-assets-control/locations/entities/location.entity';
import { BranchCompany } from '../../fixed-assets-control/branch-companies/entities/branch-company.entity';
import { Classification } from '../../fixed-assets-control/classifications/entities/classification.entity';
import { Employee } from '../../fixed-assets-control/employees/entities/employee.entity';
import { FixedAsset } from '../../fixed-assets-control/fixed-assets/entities/fixed-asset.entity';
import { FixedAssetAssignment } from '../../fixed-assets-control/fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { JobPosition } from '../../fixed-assets-control/job-positions/entities/job-position.entity';
import { MatrixCompany } from '../../fixed-assets-control/matrix-companies/entities/matrix-company.entity';
import { ResponsiveLetter } from '../../fixed-assets-control/responsive-letters/entities/responsive-letter.entity';
import { InvoiceKeys } from '../../invoice/invoice-keys/entities/invoice-keys.entity';
import { InvoiceMethodPayment } from '../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { FacturacionMetodosPago } from '../../invoice/invoice-modality-payment/entities/facturacionMetodosPago';
import { FacturacionRegimenes } from '../../invoice/invoice-regime/entities/facturacionRegimenes';
import { CashRegister } from '../../mini-store/cash-register/entities/cash-register.entity';
import { CashRegisterTransaction } from '../../mini-store/cash-register-transactions/entities/cash-register-transaction.entity';
import { MiniStoreClassification } from '../../mini-store/mini-store-classifications/entities/mini-store-classification.entity';
import { MiniStorePriceList } from '../../mini-store/mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreProduct } from '../../mini-store/mini-store-products/entities/mini-store-product.entity';
import { MiniStoreProductsProviders } from '../../mini-store/mini-store-products-providers/entities/mini-store-products-providers.entity';
import { MiniStoreWarehouseOrder } from '../../mini-store/mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { MiniStoreWarehouseOrderProduct } from '../../mini-store/mini-store-warehouse-orders-products/entities/mini-store-warehouse-order-product.entity';
import { MiniStoreWarehouseProvider } from '../../mini-store/mini-store-warehouse-providers/entities/mini-store-warehouse-provider.entity';
import { MiniStoreDetailsExtraCharges } from '../../mini-store/store-sales/mini-store-details-extra-charges/entities/mini-store-details-extra-charges.entity';
import { MiniStoreInvoice } from '../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreSale } from '../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSaleMethodPayment } from '../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { SalesReturns } from '../../mini-store/store-sales/mini-store-sales-returns/entities/sales-returns.entity';
import { SalesReturnsProducts } from '../../mini-store/store-sales/mini-store-sales-returns/entities/sales-returns-products.entity';
import { MiniStoreTransaction } from '../../mini-store/store-sales/mini-store-transaction/entities/mini-store-transaction.entity';
import { AssignmentInscription } from '../../school-colegio-ingles/assignment-incription/entities/assignment-inscription.entity';
import { Assignment } from '../../school-colegio-ingles/assignments/entities/assignment.entity';
import { AssignmentSubject } from '../../school-colegio-ingles/assignments-subjects/entities/assignment-subject.entity';
import { SchoolCharge } from '../../school-colegio-ingles/charges-school/school-charges/entities/school-charge.entity';
import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { SchoolChargesDetailsExtraCharges } from '../../school-colegio-ingles/charges-school/school-charges-details-extra-charges/entities/school-charges-details-extra-charges.entity';
import { SchoolChargesInvoice } from '../../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolChargesMethodsPayments } from '../../school-colegio-ingles/charges-school/school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { CheckIn } from '../../school-colegio-ingles/check-in/entities/check-in.entity';
import { ClassroomPermission } from '../../school-colegio-ingles/classroom-permission/entities/classroom-permission.entity';
import { Classroom } from '../../school-colegio-ingles/classrooms/entities/classroom.entity';
import { Cycle } from '../../school-colegio-ingles/cycles/entities/cycle.entity';
import { Family } from '../../school-colegio-ingles/families/entities/family.entity';
import { BusinessNameFamily } from '../../school-colegio-ingles/family-fiscal/entities/BusinessNameFamily.entity';
import { FamiliasIntegrantesTutores } from '../../school-colegio-ingles/family-members/entities/familiasIntegrantesTutores';
import { Grade } from '../../school-colegio-ingles/grades/entities/grade.entity';
import { Group } from '../../school-colegio-ingles/groups/entities/group.entity';
import { IncidentClassification } from '../../school-colegio-ingles/incident-classification/entities/incident-classification.entity';
import { Incident } from '../../school-colegio-ingles/incidents/entities/incident.entity';
import { PaymentPlanConcept } from '../../school-colegio-ingles/payment-plan-concepts/entities/payment-plan-concept.entity';
import { Periods } from '../../school-colegio-ingles/periods/entities/periods.entity';
import { StudyPlanVariant } from '../../school-colegio-ingles/study-plan-variants/entities/study-plan-variants.entity';
import { Inscription } from '../../school-colegio-ingles/inscriptions/entities/inscription.entity';
import { StudyPlan } from '../../school-colegio-ingles/study-plans/entities/study-plan.entity';
import { PaymentPlan } from '../../school-colegio-ingles/payment-plans/entities/payment-plan.entity';
import { SchoolPayment } from '../../school-colegio-ingles/school-payments/entities/school-payment.entity';
import { Student } from '../../school-colegio-ingles/students/entities/student.entity';
import { Modality } from '../../school-colegio-ingles/modalities/entities/modality.entity';
import { Level } from '../../school-colegio-ingles/levels/entities/level.entity';
import { Subject } from '../../school-colegio-ingles/subjects/entities/subject.entity';
import { Shift } from '../../system/shift/entities/shift.entity';
import { Municipalities } from '../../system/municipalities/entities/municipalities.entity';
import { Company } from '../../system/settings/entities/company.entity';
import { BranchOffice } from '../../system/branch-office/entities/branch-office.entity';
import { Folio } from '../../system/folios/entities/folio.entity';
import { InvoicesBank } from '../../system/invoices-bank/entities/invoices-bank.entity';
import { RouteAction } from '../../system/route-action/entities/route-action.entity';
import { BranchOfficeSetting } from '../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Role } from '../../system/roles/entities/role.entity';
import { States } from '../../system/states/entities/states.entity';
import { Department } from '../../system/departments/entities/department.entity';
import { SystemTypeExtraCharges } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { PaymentStatusEntity } from '../../system/payment-status/entities/payment-status.entity';
import { SystemConceptsType } from '../../system/system-concepts-type/entities/system-concepts-type.entity';
import { SystemPaymentStatus } from '../../system/system-payments-status/entities/system-payment-status.entity';
import { Permission } from '../../system/permissions/entities/permission.entity';
import { Country } from '../../system/countries/entities/country.entity';
import { AuthAccessTokensEntity } from '../../system/auth-access-tokens/entities/auth-access-tokens.entity';
import { Cities } from '../../system/cities/entities/cities.entity';
import { Route } from '../../system/routes/entities/route.entity';
import { SystemExtraCharges } from '../../system/system-extra-charges/entities/system-extra-charges.entity';
import { Action } from '../../system/actions/entities/action.entity';
import { InscriptionStatus } from '../../system/inscription-status/entities/inscription-status.entity';
import { Impuestos } from '../../system/tax/entities/impuestos';

const entities = [
  AcademyActivity,
  AcademyActivitiesGroup,
  AcademyConcepts,
  AcademyInscription,
  AcademyInscriptionConceptCharges,
  AcademyInscriptionConcepts,
  AcademiesModality,
  AcademyCharge,
  AcademyChargeDetails,
  AcademyChargeDetailsExtraCharge,
  AcademyChargeDiscounts,
  AcademyChargeInvoice,
  AcademyChargeMethodsPayments,
  AcademyChargePayments,
  AcademyChargeSurcharges,
  AcademyChargeWayOfPaying,
  BranchCompany,
  Classification,
  Employee,
  FixedAsset,
  FixedAssetAssignment,
  JobPosition,
  MatrixCompany,
  ResponsiveLetter,
  InvoiceKeys,
  InvoiceMethodPayment,
  FacturacionMetodosPago,
  FacturacionRegimenes,
  CashRegister,
  CashRegisterTransaction,
  MiniStoreClassification,
  MiniStorePriceList,
  MiniStoreProduct,
  MiniStoreProductsProviders,
  MiniStoreWarehouseOrder,
  MiniStoreWarehouseOrderProduct,
  MiniStoreWarehouseProvider,
  MiniStoreDetailsExtraCharges,
  MiniStoreInvoice,
  MiniStoreSale,
  MiniStoreSaleDetail,
  MiniStoreSaleMethodPayment,
  MiniStoreSalePayment,
  SalesReturns,
  SalesReturnsProducts,
  MiniStoreTransaction,
  AssignmentInscription,
  Assignment,
  AssignmentSubject,
  SchoolCharge,
  SchoolChargeDetails,
  SchoolChargesDetailsExtraCharges,
  SchoolChargesInvoice,
  SchoolChargesMethodsPayments,
  SchoolChargePayment,
  CheckIn,
  ClassroomPermission,
  Classroom,
  Cycle,
  Family,
  BusinessNameFamily,
  FamiliasIntegrantesTutores,
  Grade,
  Group,
  IncidentClassification,
  Incident,
  Inscription,
  Level,
  Modality,
  PaymentPlanConcept,
  PaymentPlan,
  Periods,
  SchoolPayment,
  Student,
  StudyPlanVariant,
  StudyPlan,
  Subject,
  Teacher,
  Location,
  Action,
  AuthAccessTokensEntity,
  BranchOffice,
  BranchOfficeSetting,
  Cities,
  Country,
  Department,
  Folio,
  InscriptionStatus,
  InvoicesBank,
  Municipalities,
  PaymentStatusEntity,
  Permission,
  Role,
  RouteAction,
  Route,
  Company,
  Shift,
  States,
  SystemConceptsType,
  SystemExtraCharges,
  SystemPaymentStatus,
  SystemTypeExtraCharges,
  Impuestos,
  User,
];
export default entities;
