import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolCharge } from './entities/school-charge.entity';
import { SchoolChargesService } from './school-charges.service';
import { Response } from 'express';
import { CancellationDto } from '../../../common/dto/Cancellation.dto';

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
        limit: 10,
        join: {
            schoolCampus: {eager: false},
            schoolCycle: {eager: false},
            cashier: {eager: false},
            cashierCancellation: {eager: false},
            schoolStudent: {eager: false},
            chargesDetails: { alias: 'chargeDetail', eager: false },
            'chargesDetails.extraCharges': {eager: false},
            'chargesDetails.schoolPlanPayment': {eager: false},
            'chargesDetails.extraCharges.systemExtraCharges': {eager: false},
            chargesPayments: {eager: false},
            'chargesPayments.methodsPayments': { alias: 'chargesPayments_methodsPayments', eager: false },
            'chargesPayments.methodsPayments.Bank': { alias: 'chargesPayments_methodsPayments_Bank', eager: false },
            'chargesPayments.methodsPayments.invoiceMethodPayment': {eager: false},
            'chargesPayments.cashierCharge': {eager: false},
            'chargesPayments.cashierChargeCancellation': {eager: false},
            'chargesPayments.schoolChargesInvoice': {eager: false},
            //'chargesPayments.schoolChargesInvoice.creditNotesSchool': {eager: false},
            chargesInvoice: {eager: false},
            'chargesInvoice.agentBilling': {eager: false},
            'chargesInvoice.agentCanceling': {eager: false},
            studyPlans: {eager: false},
            'studyPlans.level': {eager: false},
            PaymentPlan: {eager: false},
            'PaymentPlan.studyPlan': {eager: false},
            'PaymentPlan.level': {eager: false},
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

    @Post('/:id/cancel')
    @UsePipes(ValidationPipe)
    async cancelSale(
    @Param("id") id: string,
    @Body() payload: CancellationDto
    ) {
    return this.service.cancelSale(+id, payload);
    }
}
