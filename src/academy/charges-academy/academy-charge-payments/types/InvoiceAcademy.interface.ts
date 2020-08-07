import { BusinessNameFamily } from '../../../../school-colegio-ingles/family-fiscal/entities/BusinessNameFamily.entity';

export class QueryBillingAcademy {
    chargeId: number;
    chargePaymentId: number;
    branchOfficeId: number;
    branchOfficeSettingId: number;
    usoCfdi: {
        value: string,
        label: string
    };
    receiver: BusinessNameFamily;
    agentBillingId: number;
}
