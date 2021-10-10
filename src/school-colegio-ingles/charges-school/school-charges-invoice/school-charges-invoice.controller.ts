import {Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {SchoolChargesInvoice} from './entities/school-charges-invoice.entity';
import {SchoolChargesInvoiceService} from './school-charges-invoice.service';
import {Response} from 'express';
import * as fs from 'fs';
import {readFileSync} from 'fs';
import {BranchOfficeSettingService} from '../../../system/branch-office-setting/branch-office-setting.service';
import {BranchOfficeService} from '../../../system/branch-office/branch-office.service';
import {FactSw} from '../../../webService/FactSw';
import {SchoolChargesPaymentsService} from '../school-charges-payments/school-charges-payments.service';
import {CancelInvoiceSwDto} from '../../../mini-store/store-sales/mini-store-invoices/dto/cancel.invoice.sw.dto';
import {User} from '../../../system/users/entities/user.entity';
import {JwtGuard} from '../../../system/auth/guards/jwt.guard';
import {ConfigService} from '../../../common/config/config.service';
import {ReportInvoice} from '../../../mini-store/store-sales/mini-store-invoices/reports/invoice.report';
import * as AdmZip from 'adm-zip';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: SchoolChargesInvoice,
    },
    query: {
        limit: 200,
        join: {
            schoolChargePayment: {},
            schoolCharge: {},
            'schoolCharge.chargesDetails': {
                alias: 'details'
            },
            'schoolCharge.chargesDetails.schoolPlanPayment': {
                alias: 'concepts'
            },
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
        readonly schoolChargePayment: SchoolChargesPaymentsService,
        private smartWeb: FactSw,
        private readonly configService: ConfigService,
    ) {
    }

    get base(): CrudController<SchoolChargesInvoice> {
        return this;
    }

    @Get('/pdf')
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        try {
            const pdf64 = readFileSync(`${this.configService.getPath()}comprobantes/colegio/` + query.uuid + '.pdf');
            // data:application/pdf;filename=generated.pdf;base64,
            res.send({src: 'data:application/pdf;base64,' + pdf64.toString('base64')});
        } catch (e) {
            res.send({error: e}).status(400);
        }
    }

    @Get('/xml')
    public async xml(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        try {
            const pdf64 = readFileSync(`${this.configService.getPath()}comprobantes/colegio/` + query.uuid + '.xml');
            res.send({src: pdf64.toString('base64')});
        } catch (e) {
            res.send({error: e}).status(400);
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

    @Post('cancel-invoice')
    async cancelInvoiceSwSmartWeb(@Body() cancelInvoiceSw: CancelInvoiceSwDto, @Res() res: Response) {
        try {
            const invoice = await this.service.findOne({
                where: {
                    id: cancelInvoiceSw.invoiceId,
                },
                relations: ['schoolChargePayment'],
            });
            const currentBranch = await this.branchOffice.findBranch(cancelInvoiceSw.branchOfficeId);
            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: cancelInvoiceSw.branchOfficeSettingId,
                },
            });
            const payment = await this.schoolChargePayment.findOne({
                where: {
                    id: invoice.schoolChargePayment.id,
                },
            });
            const cer = fs.readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD).toString('base64');
            // console.log(cer);
            const key = fs.readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD).toString('base64');
            const responseSmartWeb = await this.smartWeb.cancelarCSD({
                rfc: branchOfficeSett.rfc,
                password: branchOfficeSett.password,
                uuid: invoice.uuid,
                cer,
                key,
            });
            const status = responseSmartWeb.data.uuid[invoice.uuid];
            //  console.log(responseSmartWeb);
            if (status === '201' || +status === 201 || status === '202' || +status === 202) {
                fs.writeFileSync(`${this.configService.getPath()}comprobantes/colegio/` + invoice.uuid + '-acuse.xml', responseSmartWeb.data.acuse);
                if (cancelInvoiceSw.sendMail) {
                    for (const email of cancelInvoiceSw.mails) {
                        const sendMails = this.service.sendMailCancelacion(currentBranch, invoice.uuid, email, cancelInvoiceSw.subject, cancelInvoiceSw.body);
                    }
                }
                invoice.status = 2;
                invoice.reasonCancellation = cancelInvoiceSw.reason;
                invoice.cancellationDate = new Date();
                invoice.agentCanceling = {
                    id: cancelInvoiceSw.cashierId,
                } as User;
                payment.stamping = 0;
                const updateInvoice = await this.service.updateInvoice(invoice);
                const updatePay = await this.schoolChargePayment.updatePayment(payment);
                res.send({
                    msg: 'Cancelado',
                    payment: updatePay,
                    invoice: updateInvoice,
                }).status(200);
            }
        } catch (e) {
            res.send({
                msg: e,
                payment: '',
                invoice: '',
            }).status(400);
            console.log(e);
        }
    }

    @Get('report-invoices')
    async reportInvoices(@Res() res: Response, @Query() query: {
        startDate: string;
        endDate: string;
        billingAgent: number;
        status: number;
        data: string,
        branchOfficeId: number,
        branchOfficeSettingId: number;
        onlyData: boolean
    }) {
        try {
            const dataReport = await this.service.reportInvoices(query);
            switch (query.data) {
                case 'excel':
                    const company = await this.branchOfficeSettingService.findCompany(query.branchOfficeSettingId);
                    const workbook = new ReportInvoice().generateReport(dataReport, query, company);
                    const dateName = new Date();
                    const fileName = dateName.toTimeString() + '.xlsx';
                    const result = await workbook.xlsx.writeBuffer({filename: fileName});
                    const buffer = Buffer.from(result);
                    const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                    res.status(200);
                    res.send({
                        src: b64Encoding + buffer.toString('base64'),
                    });
                    break;
                case 'zip':
                    const zip = new AdmZip();
                    for (const invoce of dataReport) {
                        zip.addLocalFile(`${this.configService.getPath()}comprobantes/colegio/${invoce.uuid}.pdf`);
                        zip.addLocalFile(`${this.configService.getPath()}comprobantes/colegio/${invoce.uuid}.xml`);
                    }

                    const downloadName = `${Date.now()}.zip`;
                    const data = zip.toBuffer();
                    res.set('Content-Type', 'application/octet-stream');
                    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
                    res.set('Content-Length', data.length.toString());
                    res.send(data);
                    break;
                default:
                    res.status(200);
                    res.send(dataReport);
                    break;
            }
        } catch (e) {
            console.log(e)
            res.status(401);
            res.send(e.message);
        }
    }

    @Get('/download-xml')
    async getXmlInvoice(@Query() request, @Res() response) {
        try {
            const workPath = this.configService.getPath();
            const xml = `${workPath}/comprobantes/colegio/${request.UUID}.xml`;
            response.download(xml);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('/download-pdf')
    getPdfInvoice(@Query() request, @Res() response) {
        try {
            const workPath = this.configService.getPath();
            const xml = `${workPath}/comprobantes/colegio/${request.UUID}.pdf`;
            response.download(xml);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
