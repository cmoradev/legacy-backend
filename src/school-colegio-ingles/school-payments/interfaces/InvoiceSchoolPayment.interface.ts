import { BusinessNameFamily } from '../../family-fiscal/entities/BusinessNameFamily.entity';

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
  receiver: BusinessNameFamily;
}
