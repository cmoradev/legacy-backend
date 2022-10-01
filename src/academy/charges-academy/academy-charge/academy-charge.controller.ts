import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyCharge } from './entities/academy-charge.entity';
import { AcademyChargeService } from './academy-charge.service';

@Crud({
    model: {
        type: AcademyCharge,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            chargeCampus: {eager: false},
            academyBranchOfficeSet: {eager: false},
            chargeCycle: {eager: false},
            cashier: {eager: false},
            cashierCancellation: {eager: false},
            schoolStudent: {eager: false},
            chargesDetails: {eager: false},
            'chargesDetails.academyInscriptionConcept': {eager: false},
            'chargesDetails.extraCharges': {eager: false},
            chargesPayments: {eager: false},
            'chargesPayments.academyChargesInvoice': {eager: false},
            'chargesPayments.methodsPayments': {
                alias: 'chargesPayments_methodsPayments',
                eager: false
            },
            'chargesPayments.methodsPayments.Bank': {
                alias: 'chargesPayments_methodsPayments_Bank',
                eager: false
            },
            'chargesPayments.methodsPayments.invoiceMethodPayment': {eager: false},
            'chargesPayments.cashierCharge': {eager: false},
            'chargesPayments.cashierChargeCancellation': {eager: false},
            'chargesPayments.schoolChargesInvoice': {eager: false},
            chargesInvoice: {eager: false},
            'chargesInvoice.agentBilling': {eager: false},
            'chargesInvoice.agentCanceling': {eager: false},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
