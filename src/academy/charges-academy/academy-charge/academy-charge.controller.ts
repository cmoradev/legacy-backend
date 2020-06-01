import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyCharge } from './entities/academy-charge.entity';
import { AcademyChargeService } from './academy-charge.service';

@Crud({
    model: {
        type: AcademyCharge,
    },
    query: {
        limit: 200,
        join: {
            chargeCampus: {},
            academyBranchOfficeSet: {},
            chargeCycle: {},
            cashier: {},
            cashierCancellation: {},
            schoolStudent: {},
            chargesDetails: {},
            'chargesDetails.extraCharges': {},
            chargesPayments: {},
            'chargesPayments.methodsPayments': {},
            'chargesPayments.methodsPayments.Bank': {},
            'chargesPayments.methodsPayments.invoiceMethodPayment': {},
            'chargesPayments.cashierCharge': {},
            'chargesPayments.cashierChargeCancellation': {},
            'chargesPayments.schoolChargesInvoice': {},
            chargesInvoice: {},
            'chargesInvoice.agentBilling': {},
            'chargesInvoice.agentCanceling': {},
        },
    },
})
@Controller()
export class AcademyChargeController implements CrudController<AcademyCharge> {
    constructor(
        readonly service: AcademyChargeService,
    ) {
    }

    get base(): CrudController<AcademyCharge> {
        return this;
    }
}
