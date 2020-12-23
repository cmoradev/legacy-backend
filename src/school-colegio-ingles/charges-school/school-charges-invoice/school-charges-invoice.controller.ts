import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { AcademyChargePaymentsService } from '../../../academy/charges-academy/academy-charge-payments/academy-charge-payments.service';
import { AcademyChargeDiscountsService } from '../../../academy/charges-academy/academy-charge-discounts/academy-charge-discounts.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';

@Crud({
    model: {
        type: SchoolChargesInvoice,
    },
    query: {
        limit: 200,
        join: {
            schoolChargePayment: {},
            schoolCharge: {},
            agentBilling: {},
            agentCanceling: {},
        },
    },
})

@Controller()
export class SchoolChargesInvoiceController implements CrudController<SchoolChargesInvoice> {
    constructor(
        readonly service: SchoolChargesInvoiceService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        readonly branchOffice: BranchOfficeService,
    ) {
    }

    get base(): CrudController<SchoolChargesInvoice> {
        return this;
    }

    @Get('/pdf')
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        try {
            const pdf64 = readFileSync('/var/www/pdc/comprobantes/colegio/' + query.uuid + '.pdf');
            // data:application/pdf;filename=generated.pdf;base64,
            res.send({ src: 'data:application/pdf;base64,' + pdf64.toString('base64') });
        } catch (e) {
            res.send({ error: e }).status(400);
        }
    }

    @Post('/send-invoice')
    async sendMail(@Body() data: {
        email: string;
        uuid: string;
        branchOfficeId: number;
        branchOfficeSettingId: number;
    }) {
        try {
            const currentBranch = await this.branchOffice.findBranch(data.branchOfficeId);
            const message = this.service.sendMail(currentBranch, data.uuid, data.email);
        } catch (e) {
            return e;
        }
    }
}
