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
    Res,
    UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import {
    Crud,
    CrudController,
    Override,
    CrudRequest,
    ParsedRequest,
    ParsedBody,
    CreateManyDto,
} from '@nestjsx/crud';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import { CancelInvoiceMinistoreDto } from './dto/cancel.invoice.ministore.dto';
import { FacturacionModerna } from 'invoice-modern';
import { CheckInvoiceMinistoreDto } from './dto/check.invoice.ministore.dto';
import { OptionsFactMod } from 'invoice-modern/lib/interfaces/FactMod';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import { FactSw } from '../../../webService/FactSw';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { CancelInvoiceSwDto } from './dto/cancel.invoice.sw.dto';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { User } from '../../../system/users/entities/user.entity';
import { PDF } from '@signati/pdf';
import { ConfigService } from '../../../common/config/config.service';
import { A117 } from '../../../pdf/A117/desing/A117';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/point-of-sale';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';

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
        join: {
            miniStoreSalePayment: { eager: false },
            miniStoreSale: { eager: false },
            "miniStoreSale.miniStoreSaleDetails": {
                alias: 'miniStoreSale_miniStoreSaleDetails'
            },
            "miniStoreSale.miniStoreSaleDetails.extraCharges": {
                alias: 'miniStoreSale_miniStoreSaleDetails_extraCharges'
            },
            'miniStoreSale.student': { eager: false },
            agentBilling: { eager: false },
            agentCanceling: { eager: false },
        },
    },
})
@Controller()
export class MiniStoreInvoicesController implements CrudController<MiniStoreInvoice> {
    option: OptionsFactMod = {
        'UserPass': '4a63456b4d5113c4fdd8f9c9539295db37bb0982',
        'UserID': 'WSI1503194J6',
        debug: 1,
        develoment: false,
        // 'UserPass': 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
        // 'UserID': 'UsuarioPruebasWS',
        // 'emisorRFC': 'WSI1503194J6',
        // 'RFC': 'GUCE910701NHA',
    };

    constructor(readonly service: MiniStoreInvoicesService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        readonly branchOffice: BranchOfficeService,
        readonly miniStoreSalesPaymentsService: MiniStoreSalesPaymentsService,
        private readonly configService: ConfigService,
        private smartWeb: FactSw) {
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
            if (query.rebuild === '1' || +query.rebuild === 1) {
                const logo = readFileSync(`${this.configService.getPath()}logos/tienditalogo.png`);
                const pathXml = `${this.configService.getPath()}comprobantes/tienda/` + query.uuid + '.xml';
                const desingpdf = new A117(pathXml, {
                    lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
                    // lugarExpedicion: branchOfficeSett.address,
                    logo: `data:image/png;base64, ${logo.toString('base64')}`,
                });
                const pdf = new PDF<A117>(desingpdf);
                await pdf.save(`${this.configService.getPath()}comprobantes/tienda/` + query.uuid);
            }
            const pdf64 = fs.readFileSync(`${this.configService.getPath()}comprobantes/tienda/` + query.uuid + '.pdf');
            // data:application/pdf;filename=generated.pdf;base64,
            // data:image/png;base64,
            res.send({ src: `data:application/pdf;base64, ${pdf64.toString('base64')}` });
        } catch (e) {
            res.send({ error: e }).status(400);
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
            const payment = await this.miniStoreSalesPaymentsService.findOne({
                where: {
                    id: invoice.miniStoreSalePayment.id,
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
                payment.stamping = 0;
                const updateInvoice = await this.service.updateInvoice(invoice);
                const updatePay = await this.miniStoreSalesPaymentsService.updatePayment(payment);
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
            resp.send(e.message);
        }
    }

    @Post('report-invoice')
    public async reportInvoice(@Res() response, @Query() query: {
        startDate: string,
        endDate: string,
        billingAgent: string,
        status: string,
        data: string,
    }) {
        console.log('Hola Mundo')
        try {
            const dataReport = await this.service.reportInvoice(query);
            response.status(200);
            response.send(dataReport);
        } catch (e) {
            console.log(e)
            response.status(404);
            response.send(e.message);
        }

    }

    @Post('/cancelar')
    public async cancelInvoice(@Body() cancelInvoice: CancelInvoiceMinistoreDto, @Res() res: Response) {
        try {

            const factura = new FacturacionModerna(this.option);
            const response = await factura.cancelar('GUCE910701NHA', cancelInvoice.uuid);
            let status = 1; // factura activa
            if (response.Code === 'GT05') {
                status = 2; // factura cancelada
            }
            if (response.Code === 'GT11') {
                status = 3; // factura en proceso
            }
            const obj = {
                id: cancelInvoice.idInvoice,
                status,
                idCancelingAgent: cancelInvoice.idAgentCanceling,
                reasonCancellation: cancelInvoice.reasonCancellation,
            };
            const invoice = await this.service.changeStautsInvoice(obj);
            const payment = await this.service.changeStautsPayment(cancelInvoice.idSalePayment, status);
            const objresult = {
                idinvoice: cancelInvoice.idInvoice,
                status,
                message: response.Message,
                invoice,
                payment,
            };
            res.status(200);
            res.send(objresult);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
        /*
          * Nuevos estados para la factura:
          * 1. Facturado
          * 2.- Cancelado
          * 3.- En cola
          * 4.- Rechazado
          * */
    }

    @Post('/checkstatusinvoice')
    async CheckStatusInvoice(@Body() checkInvoice: CheckInvoiceMinistoreDto, @Res() res: Response) {
        try {
            const factura = new FacturacionModerna(this.option);
            let total = '0';
            const totalxml = await factura.getTotalXml(`${this.configService.getPath()}comprobantes/tienda/${checkInvoice.uuid}.xml`);
            total = totalxml === checkInvoice.total ? checkInvoice.total : totalxml;
            const response = await factura.estadoCancelacion('GUCE910701NHA', checkInvoice.receptorRFC, checkInvoice.uuid, total);
            let status = 3;
            if (response.estado === 'Cancelado') {
                status = 2;
            }
            if (response.estado === 'Vigente') {
                // if (response.estatusCancelacion === 'Solicitud rechazada') {
                // status = 4;
                // }
            }
            const invoice = this.service.changeStautsInvoiceC(checkInvoice.idInvoice, status);
            const payment = await this.service.changeStautsPayment(checkInvoice.idSalePayment, status);

            const objresult = {
                idinvoice: checkInvoice.idInvoice,
                status,
                message: response,
                invoice,
                payment,
            };
            res.status(200);
            res.send(objresult);
        } catch (e) {

            res.status(400);
            res.send(e.message);
        }
    }

    @Post('/download-xml')
    getXmlInvoice(@Query() request, @Res() response) {
        try {
            const workPath = this.configService.getPath();
            const xml = `${workPath}/comprobantes/tienda/${request.UUID}.xml`;
            response.download(xml);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/download-pdf')
    getPdfInvoice(@Query() request, @Res() response) {
        try {
            const workPath = this.configService.getPath();
            const xml = `${workPath}/comprobantes/tienda/${request.UUID}.pdf`;
            response.download(xml);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
