import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyCharge } from './entities/academy-charge.entity';
import { AcademyChargeService } from './academy-charge.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
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
        limit: 200,
        join: {
            chargeCampus: {},
            academyBranchOfficeSet: {},
            chargeCycle: {},
            cashier: {},
            cashierCancellation: {},
            schoolStudent: {},
            chargesDetails: {},
            'chargesDetails.academyInscriptionConcept': {},
            'chargesDetails.extraCharges': {},
            chargesPayments: {},
            'chargesPayments.academyChargesInvoice': {},
            'chargesPayments.methodsPayments': {
                alias: 'chargesPayments_methodsPayments',
            },
            'chargesPayments.methodsPayments.Bank': {
                alias: 'chargesPayments_methodsPayments_Bank',
            },
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
