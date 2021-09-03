import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { FactSw } from '../../../webService/FactSw';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { AcademyChargePaymentsService } from '../academy-charge-payments/academy-charge-payments.service';
import { CancelInvoiceSwDto } from '../../../mini-store/store-sales/mini-store-invoices/dto/cancel.invoice.sw.dto';
import { User } from '../../../system/users/entities/user.entity';

import { ReportData } from './dto/reportData.dto';
import { AcademyChargeDiscountsService } from '../academy-charge-discounts/academy-charge-discounts.service';
import { Between } from 'typeorm';
import * as Moment from 'moment';
import { ReportInvoice } from './reports/invoice.reports';
import { ConfigService } from '../../../config/config.service';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyChargeInvoice,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 200,
        join: {},
    },
})
@Controller()
export class AcademyChargeInvoiceController implements CrudController<AcademyChargeInvoice> {
    constructor(
        readonly service: AcademyChargeInvoiceService,
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        readonly academyChargePaymentsService: AcademyChargePaymentsService,
        readonly academyChargeDiscountsService: AcademyChargeDiscountsService,
        private smartWeb: FactSw,
        private readonly configService: ConfigService,
    ) {
    }

    get base(): CrudController<AcademyChargeInvoice> {
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

    @Get('/pdf')
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        try {
            const pdf64 = readFileSync(`${this.configService.getPath()}comprobantes/academias/` + query.uuid + '.pdf');
            // data:application/pdf;filename=generated.pdf;base64,
            res.send({ src: 'data:application/pdf;base64,' + pdf64.toString('base64') });
        } catch (e) {
            res.send({ error: e }).status(400);
        }
    }

    @Post('cancel-invoice')
    async cancelInvoiceSwSmartweb(@Body() cancelInvoiceSw: CancelInvoiceSwDto, @Res() res: Response) {
        try {

            const invoce = await this.service.findOne({
                where: {
                    id: cancelInvoiceSw.invoiceId,
                },
                relations: ['academyChargePayment'],
            });
            const currentBranch = await this.branchOffice.findBranch(cancelInvoiceSw.branchOfficeId);

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: cancelInvoiceSw.branchOfficeSettingId,
                },
            });
            const payment = await this.academyChargePaymentsService.findOne({
                where: {
                    id: invoce.academyChargePayment.id,
                },
            });

            const cer = readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD).toString('base64');
            const key = readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD).toString('base64');
            const result = await this.smartWeb.cancelarCSD({
                rfc: branchOfficeSett.rfc,
                password: branchOfficeSett.password,
                uuid: invoce.uuid,
                cer,
                key,
            });

            const status = result.data.uuid[invoce.uuid];
            /** Nuevos estados para la venta:
             * 0.- Sin facturar
             * 1.- Facturado
             * 2.- Cancelado
             * 3.- En cola
             * 4.- Rechazado
             */
            if (status === '201' || +status === 201) {
                writeFileSync(`${this.configService.getPath()}comprobantes/academias/` + invoce.uuid + '-acuse.xml', result.data.acuse);
                if (cancelInvoiceSw.sendMail) {
                    for (const email of cancelInvoiceSw.mails) {
                        const sendMails = this.service.sendMailCancelacion(currentBranch, invoce.uuid, email, cancelInvoiceSw.subject, cancelInvoiceSw.body);
                    }
                }
                invoce.status = 2;
                invoce.reasonCancellation = cancelInvoiceSw.reason;
                // invoce. = cancelInvoiceSw.reason;
                payment.stamping = 0;
                const updateInvoice = await this.service.updateInvoice(invoce);
                const updatePay = await this.academyChargePaymentsService.updatePayment(payment);

                res.send({
                    msg: 'Cancelado',
                    payment: updatePay,
                    invoice: updateInvoice,
                }).status(200);
            }
            if (status === '202' || +status === 202) {
                writeFileSync(`${this.configService.getPath()}comprobantes/academias/` + invoce.uuid + '-acuse.xml', result.data.acuse);

                if (cancelInvoiceSw.sendMail) {
                    for (const email of cancelInvoiceSw.mails) {
                        const sendMails = this.service.sendMailCancelacion(currentBranch, invoce.uuid, email, cancelInvoiceSw.subject, cancelInvoiceSw.body);
                    }
                }
                invoce.agentCanceling = {
                    id: cancelInvoiceSw.cashierId,
                } as User;
                invoce.status = 2;
                payment.stamping = 0;
                const updateInvoice = await this.service.updateInvoice(invoce);
                const updatePay = await this.academyChargePaymentsService.updatePayment(payment);
                res.send({
                    msg: 'Cancelado',
                    payment: updatePay,
                    invoice: updateInvoice,
                }).status(200);
            }
            if (status === '203' || +status === 203) {
                res.send({
                    msg: 'Error',
                    payment: '',
                    invoice: '',
                }).status(400);
            }
            if (status === '205' || +status === 205) {
                res.send({
                    msg: 'Error',
                    payment: '',
                    invoice: '',
                }).status(400);
            }

        } catch (e) {
            res.send({
                msg: e,
                payment: '',
                invoice: '',
            }).status(400);
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

    @Post('/report')
    public async getReportGlobal(@Body() request: ReportData, @Res() res: Response) {

        const branchOfficeSett = await this.branchOfficeSettingService.findOne({
            where: {
                id: request.branchOfficeId,
            },
        });

        let whereParamsBilled = {};
        let whereParamsUnBilled = {};
        let whereParamsCancelled = {};

        if (request.idUsuario === 'all') {
            whereParamsBilled = {
                status: 1,
                createdAt: Between(
                    Moment(request.startDate).startOf('day').toDate(),
                    Moment(request.endDate).endOf('day').toDate()),
            };
            whereParamsUnBilled = {
                status: 0,
                createdAt: Between(
                    Moment(request.startDate).startOf('day').toDate(),
                    Moment(request.endDate).endOf('day').toDate()),
            };
            whereParamsCancelled = {
                status: 2,
                createdAt: Between(
                    Moment(request.startDate).startOf('day').toDate(),
                    Moment(request.endDate).endOf('day').toDate()),
            };
        } else {
            whereParamsBilled = {
                agentBilling: request.idUsuario,
                status: 1,
                createdAt: Between(
                    Moment(request.startDate).startOf('day').toDate(),
                    Moment(request.endDate).endOf('day').toDate()),
            };
            whereParamsUnBilled = {
                agentBilling: request.idUsuario,
                status: 0,
                createdAt: Between(
                    Moment(request.startDate).startOf('day').toDate(),
                    Moment(request.endDate).endOf('day').toDate()),
            };
            whereParamsCancelled = {
                agentCanceling: request.idUsuario,
                status: 2,
                createdAt: Between(
                    Moment(request.startDate).startOf('day').toDate(),
                    Moment(request.endDate).endOf('day').toDate()),
            };
        }

        // Billed
        const invoiceBilled = await this.service.repo.find({
            where: whereParamsBilled,
            relations: [
                'agentBilling',
                'academyChargePayment',
                'agentCanceling',
                'academyCharge',
                'academyCharge.schoolStudent',
                'academyCharge.chargesDetails',
                'academyCharge.chargesDetails.extraCharges',
            ],
        });

        // Unbilled
        const invoiceUnBilled = await this.service.repo.find({
            where: whereParamsUnBilled,
            relations: [
                'agentBilling',
                'academyChargePayment',
                'agentCanceling',
                'academyCharge',
                'academyCharge.schoolStudent',
                'academyCharge.chargesDetails',
                'academyCharge.chargesDetails.extraCharges',
            ],
        });

        // Cancelled

        const invoiceCancelled = await this.service.repo.find({
            where: whereParamsCancelled,
            relations: [
                'agentBilling',
                'agentCanceling',
                'academyChargePayment',
                'academyCharge',
                'academyCharge.schoolStudent',
                'academyCharge.chargesDetails',
                'academyCharge.chargesDetails.extraCharges',
            ],
        });

        const workSheets = [
            { name: 'Facturas Pagadas', data: invoiceBilled },
            { name: 'Pagos No Facturados', data: invoiceUnBilled },
            { name: 'Facturas Canceladas', data: invoiceCancelled },
        ];

        let workbook = null;
        let b64Encoding = '';
        let buffer = null;

        if (request.file) {
            workbook = new ReportInvoice().generateReport(workSheets, request, branchOfficeSett);

            const dateName = new Date();
            const fileName = dateName.toTimeString() + '.xlsx';
            const result = await workbook.xlsx.writeBuffer({ filename: fileName });
            buffer = Buffer.from(result);
            b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        }

        const data = {
            facturado: {
                rows: invoiceBilled,
            },
            nofacturado: {
                rows: invoiceUnBilled,
            },
            cancelados: {
                rows: invoiceCancelled,
            },
            file: '',
        };

        if (request.file) {
            data.file = b64Encoding + buffer.toString('base64');
        }
        res.send({ success: true, data });
    }
}


