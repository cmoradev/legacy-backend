import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Res,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { MiniStoreSalesPaymentsBillingService } from './mini-store-sales-payments-billing.service';
import {
    InvoiceMethodsPaymentsService
} from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling } from './interface/InvoiceMiniStore.interface';
import { FactSw } from '../../../webService/FactSw';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { ConfigService } from '../../../common/config/config.service';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { Environment, InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { AttachmentsType } from "../../../types";
import { CancellationDto } from 'src/common/dto/Cancellation.dto';
import { S3Service } from 'src/common/storage/s3.service';

@Crud({
    model: {
        type: MiniStoreSalePayment,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            agent: {eager: false},
            miniStoreSaleMethodPayments: {eager: false},
            'miniStoreSaleMethodPayments.invoiceMethodPayment': {eager: false},
            miniStoreInvoices: {eager: false},
            miniStoreSale: {eager: false},
        },
    },
})
@Controller()
export class MiniStoreSalesPaymentsController implements CrudController<MiniStoreSalePayment> {
    private env: Environment = {
        instancePath: this.configService.getPath(),
        xslt: this.configService.getXsltPath()
    };

    constructor(
        readonly service: MiniStoreSalesPaymentsService,
        readonly serviceBilling: MiniStoreSalesPaymentsBillingService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
        readonly miniStoreInvoicesService: MiniStoreInvoicesService,
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        private smartWeb: FactSw,
        private readonly configService: ConfigService,
        private _s3Service: S3Service
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
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

    @Post('/billing')
    async billing(@Body() query: QueryBilling, @Res() response) {
        try {
            const result = await this.serviceBilling.processBilling(query);
            if (result.stamping) {
                response.status(200);
                response.send(result);
            } else {
                response.status(400).send(result);
            }
        } catch (e) {
            console.log(e);
            response.status(400);
            response.send(e);
        }
    }

    @Post('/send-receipt')
    public async sendReceipt(@Body() query: any, @Res() res) {
        try {
            const result = await this.service.findSaleByPayment(query);

            const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
                payment: result.payment,
                details: result.sale.miniStoreSaleDetails,
                type: InvoiceModules.STORE,
                typeConcept: 'Recepit',
            });

            let invoiceFind = undefined;

            if (query.salePaymentId != 0 && result.payment.globalUuid == null) {
                invoiceFind = await this.miniStoreInvoicesService.findInvoiceByPayment({
                    paymentId: query.salePaymentId,
                    status: StatusInvoce.invoiced,
                });
            }

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: query.branchOfficeSettingId,
                },
            });

            const branchOffice = await this.branchOffice.findBranch(query.branchOfficeId);

            const receipt = await this.service.createReceipt(result, branchOfficeSett, invoiceFind, invoiceDetails);

            const attachments: AttachmentsType[] = [];

            const base64 = await receipt.getBase64();

            const content = Buffer.from(base64, 'base64');

            const filename = `Comprobante-Pago.pdf`.toLowerCase().split(' ').join('-');

            attachments.push({filename, content});

            const data = this.service.sendReceipt(branchOffice, attachments, query.email);

            res.send(data);
        } catch (e: any) {
            console.warn(e);

            res.status(404);

            res.send({
                error: e,
            });
        }
    }

    @Post('/receipt')
    public async billingGet(@Body() query: any, @Res() res) {
        try {
            const result = await this.service.findSaleByPayment(query);

            const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
                payment: result.payment,
                details: result.sale.miniStoreSaleDetails,
                type: InvoiceModules.STORE,
                typeConcept: 'Recepit',
            });

            let invoiceFind = undefined;

            if (query.salePaymentId != 0 && result.payment.globalUuid == null) {
                invoiceFind = await this.miniStoreInvoicesService.findInvoiceByPayment({
                    paymentId: query.salePaymentId,
                    status: StatusInvoce.invoiced,
                });
            }

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: query.branchOfficeSettingId,
                },
            });

            const receipt = await this.service.createReceipt(result, branchOfficeSett, invoiceFind, invoiceDetails);

            const base64 = await receipt.getBase64();

            res.send({
                src: `data:application/pdf;base64,${base64}`
            })
        } catch (e: any) {
            console.warn(e);

            res.status(404);

            res.send({
                error: e,
            });
        }
    }

    @Post('/not-invoiced')
    @UsePipes(ValidationPipe)
    public async notInvoiced(@Body() query: NotInvoicedDto, @Res() resp): Promise<any> {
        try {
            const data = await this.service.getGlobalInvoiceFromSales(query);

            resp.status(200);
            resp.send(data);
        } catch (e) {
            resp.status(400);
            resp.send(e);
        }
    }

    @Post('/global-billing')
    @UsePipes(ValidationPipe)
    public async globalBilling(
        @Body() query: NotInvoicedDto,
        @Res() response,
    ): Promise<any> {
        try {
            const result = await this.serviceBilling.processGlobalBilling(query);
            response.status(200);
            response.send(result);
        } catch (e) {
            console.log(e);
            response.status(400);
            response.send(e);
        }
    }

    @Get('/details-invoice')
    async detailsInvoiceByUuid(@Query() params: { uuid: string }, @Res() res) {
        try {

            const result = await this.service.detailsInvoiceByUuid(params);
            const invoice = await this.miniStoreInvoicesService.findOne({
                where: {
                    uuid: params.uuid,
                },
                relations: [
                    'agentCanceling',
                    'agentBilling',
                ],
            });
            if (result) {
                const miniStoreSaleDetails = [];
                let folio = '';
                result.forEach((p, index) => {
                    miniStoreSaleDetails.push(...p.miniStoreSale.miniStoreSaleDetails.map((s) => {
                        return {
                            ...s,
                            miniStoreSale: {
                                id: p.miniStoreSale.id,
                                folio: p.miniStoreSale.folio,
                                miniStoreSalePayments: {id: p.id, folio: p.folio}
                            },
                        }
                    }));
                    folio = index == 0 ? p.miniStoreSale.folio : `${folio}, ${p.miniStoreSale.folio}`
                });
                const obj: MiniStoreInvoice = {
                    ...invoice,
                    agentBilling: invoice.agentBilling,
                    agentCanceling: invoice.agentCanceling,
                    miniStoreSale: {
                        id: 0,
                        folio,
                        miniStoreSaleDetails
                    } as MiniStoreSale,
                    miniStoreSalePayment: {
                        change: 0,
                        createdAt: invoice.createdAt,
                        dateCancellation: invoice.cancellationDate,
                        deletedAt: invoice.deletedAt,
                        folio: 'N/A',
                        globalUuid: params.uuid,
                        id: 0,
                        idAgentCancellation: invoice.idCancelingAgent,
                        idSale: 0,
                        idStatusPayment: 1,
                        isIVA: true,
                        observations: "",
                        paymentStatus: 2,
                        quantity: invoice.total,
                        reasonCancellation: invoice.reasonCancellation,
                        stamping: 1,
                        updatedAt: invoice.updatedAt,
                        uuid: params.uuid,
                    } as MiniStoreSalePayment
                } as MiniStoreInvoice
                res.status(200);
                res.send(obj);
            } else {
                res.status(400);
                res.send({
                    error: 'PAYMENTS_NOT_FOUND',
                });
            }
        } catch (e) {

            res.status(400);
            res.send({
                error: {
                    msj: 'NOT_FOUND',
                    details: e
                },
            });
        }
    }

    @Post('/:id/cancel')
    @UsePipes(ValidationPipe)
    async cancelPayment(
    @Param("id") id: string,
    @Body() payload: CancellationDto
    ) {
        return this.service.cancelPayment(+id, payload);
    }
}
