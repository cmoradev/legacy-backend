import { RelateParams } from 'src/common/point-of-sale/types.pos';
import { InformacionGlobal } from '../../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
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
    informacionGlobal?: InformacionGlobal;
    receiver: BusinessNameFamily;
    agentBillingId: number;
    related: RelateParams[];
}
