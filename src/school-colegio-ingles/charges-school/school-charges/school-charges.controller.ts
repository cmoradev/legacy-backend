import { Controller, Delete, Get, Param, ParseIntPipe, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolCharge } from './entities/school-charge.entity';
import { SchoolChargesService } from './school-charges.service';
import { Response } from 'express';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: SchoolCharge,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 200,
        join: {
            schoolCampus: {},
            schoolCycle: {},
            cashier: {},
            cashierCancellation: {},
            schoolStudent: {},
            chargesDetails: {},
            'chargesDetails.extraCharges': {},
            'chargesDetails.schoolPlanPayment': {},
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
            studyPlans: {},
            'studyPlans.level': {},
            PaymentPlan: {},
            'PaymentPlan.studyPlan': {},
            'PaymentPlan.level': {},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }

    @Get('/add/cobros')
    public async addInsccripciones(@Req() req, @Res() res: Response) {
        try {
            // @ts-ignore
            // const data = await this.service.repo.save(cobrosCiclo5);
            res.send({ save: true });
        } catch (e) {
            res.send(e);
        }

    }
}
