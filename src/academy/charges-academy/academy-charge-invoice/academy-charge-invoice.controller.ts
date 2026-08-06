import {
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    Res
} from '@nestjs/common';
import {
    Crud,
    CrudController,
    Override,
    CrudRequest,
    ParsedRequest
} from '@nestjsx/crud';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';
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
import { Between, In } from 'typeorm';
import * as Moment from 'moment';
import { ReportInvoice } from './reports/invoice.reports';
import { ConfigService } from '../../../common/config/config.service';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/point-of-sale';
import { Public } from '../../../common/docorators/public.decorator';
import * as AdmZip from 'adm-zip';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { S3Service } from 'src/common/storage/s3.service';

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
        limit: 10,
        join: {
            academyChargePayment: {eager: false},
            academyCharge: {eager: false},
            'academyCharge.chargesDetails': {
                alias: 'academyCharge_chargesDetails',
                eager: false,
            },
            'academyCharge.chargesDetails.extraCharges': {
                alias: 'academyCharge_chargesDetails_extraCharges',
                eager: false,
            },
            'academyCharge.schoolStudent': { eager: false },
            agentBilling: {eager: false},
            agentCanceling: {eager: false},
            creditNotesAcademy: { eager: false}
        },
    },
    params: {
        id: {
            primary: true,
            disabled: true,
        },
        UUID: {
            type: 'string',
            disabled: false
        },
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
        private readonly s3Service: S3Service,
    ) {
    }

    get base(): CrudController<AcademyChargeInvoice> {
        return this;
    }

    @Override('getOneBase')
    async getOneAndDoStuff(
        @ParsedRequest() req: CrudRequest,
    ) {
        if(req.parsed.search.$and.length > 2){
            return this.base.getManyBase(req)
        }
        const invoice = await this.base.getOneBase(req);
        const { academyChargePayment, academyCharge } = invoice
        const { chargesDetails } = academyCharge
        if (academyChargePayment && academyCharge && chargesDetails) {
            const factor = ConceptsPriceByPaymentBillig({
                payment: academyChargePayment,
                details: chargesDetails,
                type: InvoiceModules.ACADEMY
            });
            const { detalles } = factor
            // @ts-ignore
            invoice.detalles = detalles
            detalles.map((detalle) => {
                const findIndex = chargesDetails.findIndex((mssd) => mssd.id === detalle.id)
                if (findIndex > -1) {
                    // @ts-ignore
                    chargesDetails[findIndex].sat = detalle
                }
            })
        }
        return invoice
    }


    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }

    @Get(':id/pdf')
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        
        try {
            const uuid = query.uuid.toLowerCase();

            const pdfBuffer = await this.s3Service.getObjectCommand(
                `comprobantes/academias/${uuid}.pdf`,
            );
            return res.send({ src: 'data:application/pdf;base64,' + pdfBuffer.toString('base64') });
           
        } catch (e) {
            res.status(400).send({ error: e });
        }
    }

    @Post('cancel-invoice')
    async cancelInvoiceSwSmartweb(@Body() cancelInvoiceSw: CancelInvoiceSwDto, @Res() res: Response) {
        try {
            const invoice = await this.service.findOne({
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

            const cer = readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD).toString('base64');
            const key = readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD).toString('base64');

            const result = await this.smartWeb.cancelarCSD({
                rfc: branchOfficeSett.rfc,
                password: branchOfficeSett.password,
                uuid: invoice.uuid,
                cer,
                key,
                motivo: cancelInvoiceSw.motivo,
                folioSustitucion: cancelInvoiceSw.folioSustitucion
            });

            const status = result.data.uuid[invoice.uuid];
            /** Nuevos estados para la venta:
             * 0.- Sin facturar
             * 1.- Facturado
             * 2.- Cancelado
             * 3.- En cola
             * 4.- Rechazado
             */
            if (status === '201' || +status === 201 || status === '202' || +status === 202) {
                writeFileSync(`${this.configService.getPath()}comprobantes/academias/` + invoice.uuid + '-acuse.xml', result.data.acuse);

                if (cancelInvoiceSw.sendMail) {
                    for (const email of cancelInvoiceSw.mails) {
                        const sendMails = this.service.sendMailCancelacion(currentBranch, invoice.uuid, email, cancelInvoiceSw.subject, cancelInvoiceSw.body);
                    }
                }

                invoice.status = 2;
                invoice.reasonCancellation = cancelInvoiceSw.reason;
                invoice.cancellationDate = new Date();
                invoice.motivo = cancelInvoiceSw.motivo;
                invoice.folioSustitucion = cancelInvoiceSw.folioSustitucion;
                invoice.agentCanceling = {
                    id: cancelInvoiceSw.cashierId,
                } as User;

                const updateInvoice = await this.service.updateInvoice(invoice);

                if (invoice.isGlobal == InvoiceGlobalEnum.IS_GLOBAL) {
                    const payments = await this.academyChargePaymentsService.find({ where: { globalUuid: invoice.uuid } })

                    const ids = payments.map(value => value.id)

                    const updatePay = await this.academyChargePaymentsService.repo.update({ id: In(ids) }, { stamping: 0, globalUuid: null });

                    res.send({
                        msg: 'Cancelado',
                        payment: updatePay,
                        invoice: updateInvoice,
                    }).status(200)
                } else {
                    const payment = await this.academyChargePaymentsService.findOne({
                        where: {
                            id: invoice.academyChargePayment.id,
                        },
                    });

                    payment.stamping = 0;

                    const updatePay = await this.academyChargePaymentsService.updatePayment(payment);

                    res.send({
                        msg: 'Cancelado',
                        payment: updatePay,
                        invoice: updateInvoice,
                    }).status(200)
                }
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
            res.status(400).send(e);
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

    @Public()
    @Get('/download-pdf')
    async getPdfInvoice(@Query('UUID') UUID: string, @Res() response) {
        try {
            const uuid = UUID.toLowerCase();
            const pdfBuffer = await this.s3Service.getObjectCommand(
                `comprobantes/academias/${uuid}.pdf`,
            );
            response.set('Content-Type', 'application/pdf');
            response.set('Content-Disposition', `attachment; filename="${uuid}.pdf"`);
            response.send(pdfBuffer);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Public()
    @Get('/download-xml')
    async getXmlInvoiceUUID(@Query('UUID') UUID: string, @Res() response) {
        try {
            const uuid = UUID.toLowerCase();
            const xmlBuffer = await this.s3Service.getObjectCommand(
                `comprobantes/academias/${uuid}.xml`,
            );
            response.set('Content-Type', 'application/xml');
            response.set('Content-Disposition', `attachment; filename="${uuid}.xml"`);
            response.send(xmlBuffer);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('zip-invoices')
    async zipInvoices(@Res() res: Response, @Body() params: {
        array: NotInvoiced[]
    }
    ) {
        try {
            const zip = new AdmZip();
            const filesToDownload = params.array.map((i: NotInvoiced) => {
                const uuid = (i.f_uuid != null ? i.f_uuid : i.p_global_uuid).toLowerCase();
                return Promise.all([
                    this.s3Service.getObjectCommand(`comprobantes/academias/${uuid}.pdf`).then(buf => ({ name: `${uuid}.pdf`, buffer: buf })),
                    this.s3Service.getObjectCommand(`comprobantes/academias/${uuid}.xml`).then(buf => ({ name: `${uuid}.xml`, buffer: buf })),
                ]);
            });
            const allFiles = await Promise.all(filesToDownload);
            for (const pair of allFiles) {
                pair.forEach(file => zip.addFile(file.name, file.buffer));
            }

            const downloadName = `${Date.now()}.zip`;
            const data = zip.toBuffer();
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            res.set('Content-Length', data.length.toString());
            res.send(data);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }
}


