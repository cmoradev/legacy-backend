import { InformacionGlobal } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { BusinessNameFamily } from '../../family-fiscal/entities/BusinessNameFamily.entity';
import { Student } from '../../students/entities/student.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';

export class QuerySchoolPaymentBilling {
  agentBillingId: number;
  chargeId: number;
  chargePaymentId: number;
  branchOfficeId: number;
  branchOfficeSettingId: number;
  usoCfdi: {
    value: string,
    label: string
  };
  informacionGlobal?: InformacionGlobal;
  receiver: BusinessNameFamily;
  student: Student;
  studyPlan: StudyPlan;
}
