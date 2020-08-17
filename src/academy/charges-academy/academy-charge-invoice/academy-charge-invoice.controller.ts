import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
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

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyChargeInvoice,
    },
    query: {
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
        private  smartWeb: FactSw,
    ) {
    }

    get base(): CrudController<AcademyChargeInvoice> {
        return this;
    }

    @Get('/pdf')
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        try {
            const pdf64 = readFileSync('/var/www/pdc/comprobantes/academias/' + query.uuid + '.pdf');
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

            const cer = readFileSync('/var/www/CSD/' + branchOfficeSett.cerCSD).toString('base64');
            const key = readFileSync('/var/www/CSD/' + branchOfficeSett.keyCSD).toString('base64');
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
                writeFileSync('/var/www/pdc/comprobantes/academias/' + invoce.uuid + '-acuse.xml', result.data.acuse);
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
                writeFileSync('/var/www/pdc/comprobantes/academias/' + invoce.uuid + '-acuse.xml', result.data.acuse);

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

}
