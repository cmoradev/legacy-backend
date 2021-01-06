import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolCharge } from './entities/school-charge.entity';
import { SchoolChargesService } from './school-charges.service';

@Crud({
  model: {
    type: SchoolCharge,
  },
  query: {
    limit: 200,
    join: {
      schoolCampus: {},
      schoolCycle: {},
      cashier: {},
      cashierCancellation: {},
      schoolStudent: {},
      chargesDetails: {},
      'chargesDetails.extraCharges': {},
      'chargesDetails.extraCharges.systemExtraCharges': {},
      chargesPayments: {},
      'chargesPayments.methodsPayments': { alias: 'chargesPayments_methodsPayments' },
      'chargesPayments.methodsPayments.Bank': { alias: 'chargesPayments_methodsPayments_Bank' },
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
export class SchoolChargesController implements CrudController<SchoolCharge> {
  constructor(
    readonly service: SchoolChargesService,
  ) {
  }

  get base(): CrudController<SchoolCharge> {
    return this;
  }
}
