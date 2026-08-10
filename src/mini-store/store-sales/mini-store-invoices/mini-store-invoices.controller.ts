import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException, HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    Res
} from '@nestjs/common';
import { Response } from 'express';
import {
    Crud,
    CrudController,
    Override,
    CrudRequest,
    ParsedRequest
} from '@nestjsx/crud';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import * as fs from 'fs';
import { FactSw } from '../../../webService/FactSw';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { CancelInvoiceSwDto } from './dto/cancel.invoice.sw.dto';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { User } from '../../../system/users/entities/user.entity';
import { ConfigService } from '../../../common/config/config.service';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/point-of-sale';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { Public } from '../../../common/docorators/public.decorator';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { In } from 'typeorm';
import { S3Service } from 'src/common/storage/s3.service';
import { ComprobanteDownloadService } from 'src/common/storage/comprobante-download.service';

@Crud({
    model: {
        type: MiniStoreInvoice,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            miniStoreSalePayment: { eager: false },
            miniStoreSale: { eager: false },
            'miniStoreSale.miniStoreSaleDetails': {
                alias: 'miniStoreSale_miniStoreSaleDetails',
                eager: false
            },
            'miniStoreSale.miniStoreSaleDetails.extraCharges': {
                alias: 'miniStoreSale_miniStoreSaleDetails_extraCharges',
                eager: false
            },
            'miniStoreSale.student': { eager: false },
            agentBilling: { eager: false },
            agentCanceling: { eager: false },
            creditNotesStore: { eager: false}
        },
    },
})
@Controller()
export class MiniStoreInvoicesController implements CrudController<MiniStoreInvoice> {

    constructor(readonly service: MiniStoreInvoicesService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        readonly branchOffice: BranchOfficeService,
        readonly miniStoreSalesPaymentsService: MiniStoreSalesPaymentsService,
        private readonly configService: ConfigService,
        private smartWeb: FactSw,
        private readonly s3Service: S3Service,
        private readonly comprobanteDownloadService: ComprobanteDownloadService,
    ) {
    }

    get base(): CrudController<MiniStoreInvoice> {
        return this;
    }

    @Override('getOneBase')
    async getOneAndDoStuff(
        @ParsedRequest() req: CrudRequest,
    ) {
        const invoice = await this.base.getOneBase(req);
        const { miniStoreSalePayment, miniStoreSale } = invoice
        const { miniStoreSaleDetails } = miniStoreSale
        if (miniStoreSalePayment && miniStoreSale && miniStoreSaleDetails) {
            const factor = ConceptsPriceByPaymentBillig({
                payment: miniStoreSalePayment,
                details: miniStoreSaleDetails,
                type: InvoiceModules.STORE
            });
            const { detalles } = factor
            // @ts-ignore
            invoice.detalles = detalles
            detalles.map((detalle) => {
                const findIndex = miniStoreSaleDetails.findIndex((mssd) => mssd.id === detalle.id)
                if (findIndex > -1) {
                    // @ts-ignore
                    miniStoreSaleDetails[findIndex].sat = detalle
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
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string, rebuild: string }) {
        try {
            const uuid = query.uuid.toLowerCase();

            const pdfBuffer = await this.s3Service.getObjectCommand(
                `comprobantes/tienda/${uuid}.pdf`,
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
                relations: ['miniStoreSalePayment'],
            });

            const currentBranch = await this.branchOffice.findBranch(cancelInvoiceSw.branchOfficeId);
            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: cancelInvoiceSw.branchOfficeSettingId,
                },
            });

            const cer = fs.readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD).toString('base64');
            const key = fs.readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD).toString('base64');

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
                fs.writeFileSync(`${this.configService.getPath()}comprobantes/tienda/` + invoice.uuid + '-acuse.xml', result.data.acuse);

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
                    const payments = await this.miniStoreSalesPaymentsService.find({ where: { globalUuid: invoice.uuid } })

                    const ids = payments.map(value => value.id)

                    const updatePay = await this.miniStoreSalesPaymentsService.repo.update({ id: In(ids) }, { stamping: 0, globalUuid: null });

                    res.send({
                        msg: 'Cancelado',
                        payment: updatePay,
                        invoice: updateInvoice,
                    }).status(200)
                } else {
                    const payment = await this.miniStoreSalesPaymentsService.findOne({
                        where: {
                            id: invoice.miniStoreSalePayment.id,
                        },
                    });

                    payment.stamping = 0;

                    const updatePay = await this.miniStoreSalesPaymentsService.updatePayment(payment);

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
            console.warn(e)
            res.status(400).send(e);
        }
    }

    @Post('/send-invoice')
    async sendMail(@Body() data: {
        email: string;
        uuid: string;
        branchOfficeId: number;
        branchOfficeSettingId: number;
    }, @Res() resp: Response) {
        try {
            const currentBranch = await this.branchOffice.findBranch(data.branchOfficeId);
            const message = this.service.sendMail(currentBranch, data.uuid, data.email);
            resp.status(200);
            resp.send(message);
        } catch (e) {
            resp.status(404);
            resp.send(e instanceof Error ? e.message : '');
        }
    }

    @Public()
    @Get('/download-xml/:UUID')
    async getXmlInvoice(@Param('UUID') UUID: string, @Res() response) {
        const file = await this.comprobanteDownloadService.downloadFile('tienda', UUID, 'xml');
        this.comprobanteDownloadService.sendFile(response, file.buffer, file.contentType, file.filename);
    }

    @Public()
    @Get('/download-pdf/:UUID')
    async getPdfInvoice(@Param('UUID') UUID: string, @Res() response) {
        const file = await this.comprobanteDownloadService.downloadFile('tienda', UUID, 'pdf');
        this.comprobanteDownloadService.sendFile(response, file.buffer, file.contentType, file.filename);
    }
    // eliminar al cambiar los reporte del front
    @Post('report-invoice')
    public async reportInvoice(@Res() response, @Query() query: {
        startDate: string,
        endDate: string,
        billingAgent: string,
        status: string,
        data: string,
    }) {
        try {
            const dataReport = await this.service.reportInvoice(query);
            response.status(200);
            response.send(dataReport);
        } catch (e) {
            console.log(e)
            response.status(404);
            response.send(e instanceof Error ? e.message : '');
        }

    }
}
