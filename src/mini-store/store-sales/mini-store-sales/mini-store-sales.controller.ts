import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { totalForCashier, totalForCategory, totalForProducts } from './reports/mini-store-sale.report';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { SaleReport } from './types/SaleReport';
import { QuerySimpleReport } from '../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import {
    IQueryReportInformative,
    IQueryReportSaleTodayOp,
    IReportInformativeRow,
    IReportSaleTodayRow
} from './types/IReport';
import { getNameReport, getRangeDates } from './reports/helpers';
import { SaleTodayExcel } from './reports/sale.today.excel';
import { InformativeExcel } from './reports/informative.excel';
import { Decimal } from '@munyaal/calculations';
import { TypeInformativeReport } from '../../../common/enums/typeInformativeReport.enum';
import { NotInvoiced, PaymentExtraCharge } from '../../../common/interface/not-invoiced.interface';
import { SaleReturnExcel } from './reports/sale-return.excel';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { dataFullSale, PaymentExcel, reportPaymentByClient } from '../../../common/utils/report';

@Crud({
    model: {
        type: MiniStoreSale,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            cashier: { eager: false },
            student: { eager: false },
            cycle: { eager: false },
            storeBranchOffice: { eager: false },
            storeBranchOfficeSet: { eager: false },
            miniStoreSalePayments: { eager: false },
            'miniStoreSalePayments.miniStoreInvoices': {
                alias: 'miniStoreSalePayments_miniStoreInvoices',
                eager: false
            },
            'miniStoreSalePayments.miniStoreInvoices.creditNoteStore': {
                alias: 'miniStoreSalePayments_miniStoreInvoices_creditNoteStore',
                eager: false
            },
            'miniStoreSalePayments.agent': {
                alias: 'miniStoreSalePayments_agent',
                eager: false
            },
            'miniStoreSalePayments.miniStoreSaleMethodPayments': {
                alias: 'miniStoreSalePayments_miniStoreSaleMethodPayments',
                eager: false
            },
            'miniStoreSalePayments.miniStoreSaleMethodPayments.Bank': {
                alias: 'miniStoreSaleMethodPayments_Bank',
                eager: false
            },
            'miniStoreSalePayments.miniStoreSaleMethodPayments.invoiceMethodPayment': {
                alias: 'miniStoreSaleMethodPayments_invoiceMethodPayment',
                eager: false
            },
            miniStoreSaleDetails: { eager: false },
            'miniStoreSaleDetails.miniStoreClassification': {
                alias: 'miniStoreSaleDetails_miniStoreClassification',
                eager: false
            },
            'miniStoreSaleDetails.miniStoreProduct': {
                alias: 'miniStoreSaleDetails_miniStoreProduct',
                eager: false
            },
            'miniStoreSaleDetails.extraCharges': {
                alias: 'miniStoreSaleDetails_extraCharges',
                eager: false
            },
            miniStoreInvoices: { eager: false },
            returnedProducts: { eager: false },
            'returnedProducts.agent': {
                alias: 'returnedProducts_agent',
                eager: false
            },
            'returnedProducts.invoices': {
                alias: 'returnedProducts_invoices',
                eager: false
            },
            'returnedProducts.details': {
                alias: 'returnedProducts_details',
                eager: false
            },
            'returnedProducts.details.saleDetail': {
                alias: 'details_saleDetail',
                eager: false
            },
            agentBilling: { eager: false },
            agentCanceling: { eager: false },
            quotation: { eager: false },
            'quotation.quotation': { eager: false },
            sale: { eager: false },
            'sale.cashier': { eager: false },
        },

    },
})
@Controller()
export class MiniStoreSalesController implements CrudController<MiniStoreSale> {
    constructor(
        readonly service: MiniStoreSalesService,
        readonly paymentService: MiniStoreSalesPaymentsService,
    ) {
    }

    get base(): CrudController<MiniStoreSale> {
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

    @Get('/sale-report')
    async saleReport(@Req() request, @Res() res, @Query() query: {
        status: number,
        startDate: Date,
        endDate: Date,
        onlyFile: boolean,
        type: number,
        branchOfficeId: number;
    }) {

        const result: SaleReport = {
            products: [],
            category: [],
            cashier: [],
            file: '',
        };
        if (query.type === 1 || query.type.toString() === '1') {
            result.products = totalForProducts(await this.service.reportCatCasherProd(query));
        }
        if (query.type === 2 || query.type.toString() === '2') {
            result.category = totalForCategory(await this.service.reportCatCasherProd(query));
        }
        if (query.type === 3 || query.type.toString() === '3') {
            result.cashier = totalForCashier(await this.paymentService.fetchFilteredPayments({
                status: query.status,
                endDate: query.endDate,
                startDate: query.startDate,
                branchOfficeId: query.branchOfficeId,
            } as QuerySimpleReport));
        }
        res.send(result);
    }

    @Get('report-sale-today')
    private async reportSaleToday(
        @Res() res,
        @Query() options: IQueryReportSaleTodayOp,
    ) {
        const result = await this.service.reportSaleToday(options);
        let data: IReportSaleTodayRow[] = [];
        let dataByClient: IReportSaleTodayRow[] = [];
        data = result.map((d: any) => {
            let idsPagos = [];
            let idsDetalles = [];

            d.idsPagos != null ? idsPagos = d.idsPagos.split(',') : [];
            d.idsDetalles != null ? idsDetalles = d.idsDetalles.split(',') : [];
            return { ...d, id_estado_pago: parseInt(`${d.id_estado_pago}`), idsPagos: idsPagos.map((p: string) => { return parseInt(`${p}`) }), idsDetalles: idsDetalles.map((p: string) => { return parseInt(`${p}`) }) } as IReportSaleTodayRow
        });

        if (options.byClient) {
            //dataByClient = reportSaleTodayByClient(data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new SaleTodayExcel(options, options.byClient ? dataByClient : data);
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport(options.byClient ? 'Ventas por cliente' : 'Ventas', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport(options.byClient ? 'Ventas por cliente' : 'Ventas', options).excel}`,
            };
            return res.send({ report, data: options.byClient ? dataByClient : data });
        } else {
            return res.send({ report: false, data: options.byClient ? dataByClient : data });
        }
    }

    @Get('report-informative')
    private async reportInformative(
        @Res() res,
        @Query() options: IQueryReportInformative,
    ) {
        const result = await this.service.reportInformative(options);
        const dataFolios: IReportInformativeRow[] = [];
        const data: IReportInformativeRow[] = [];
        result.forEach((r: IReportInformativeRow) => {
            switch (parseInt(`${options.type}`)) {
                case TypeInformativeReport.PRODUCTS:
                    const index = data.findIndex((d: IReportInformativeRow) => d.p_id_product == r.p_id_product);
                    if (index > -1) {
                        data[index].vd_quantity = Decimal.sum(data[index].vd_quantity, r.vd_quantity).toNumber();
                        data[index].subtotal = Decimal.mul(data[index].vd_quantity, r.vd_price).toNumber();
                    } else {
                        data.push(r);
                    }
                    if (r.v_folio_venta != null && r.folios_ventas_pagos != null) {
                        dataFolios.push(r);
                    }
                    break;
                case TypeInformativeReport.CATEGORIES:
                    const indexCategory = data.findIndex((d: IReportInformativeRow) => d.c_id == r.c_id);
                    if (indexCategory > -1) {
                        data[indexCategory].vd_quantity = Decimal.sum(data[indexCategory].vd_quantity, r.vd_quantity).toNumber();
                        const priceCategories = Decimal.mul(r.vd_quantity, r.vd_price).toNumber();
                        data[indexCategory].subtotal = Decimal.sum(
                            data[indexCategory].subtotal,
                            priceCategories,
                        ).toNumber();

                    } else {
                        data.push({ ...r, subtotal: Decimal.mul(r.vd_quantity, r.vd_price).toNumber(), });
                    }
                    break;
                case TypeInformativeReport.CASHIERS:
                    const indexCashier = data.findIndex((d: IReportInformativeRow) => d.u_id_agent == r.u_id_agent);
                    if (indexCashier > -1) {
                        data[indexCashier].vd_quantity = Decimal.sum(data[indexCashier].vd_quantity, r.vd_quantity).toNumber();
                        const priceCashier = Decimal.mul(r.vd_quantity, r.vd_price).toNumber();
                        data[indexCashier].subtotal = Decimal.sum(
                            data[indexCashier].subtotal,
                            priceCashier,
                        ).toNumber();
                    } else {
                        data.push({ ...r, subtotal: Decimal.mul(r.vd_quantity, r.vd_price).toNumber(), });
                    }
                    break;
            }
        });

        if (options?.isExported) {
            const conceptStatusExcel = new InformativeExcel(options, data, dataFolios.sort((a, b) => a.p_id_product - b.p_id_product));
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `Informativo${getRangeDates(options.startDate, options.endDate).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `Informativo${getRangeDates(options.startDate, options.endDate).excel}`,
            };
            return res.send({ report, data });
        } else {
            return res.send({ report: false, data });
        }
    }

    @Get('report-sales')
    private async reportSales(
        @Res() res,
        @Query() options: IQueryReportSaleTodayOp,
    ) {
        const result = await this.service.reportSales(options);
        let data: PaymentExtraCharge[] = dataFullSale(result, InvoiceModules.STORE)
        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : data, [], InvoiceModules.STORE, 'Ventas');
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport(options.byClient ? 'Ventas_por_cliente' : 'Ventas', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport(options.byClient ? 'Ventas_por_cliente' : 'Ventas', options).excel}`,
            };
            return res.send({ report, data: options.byClient ? dataByClient : data });
        } else {
            return res.send({ report: false, data: options.byClient ? dataByClient : data });
        }
    }

    @Get('report-sales-returns')
    private async reportSalesReturns(
        @Res() res,
        @Query() options: IQueryReportSaleTodayOp,
    ) {
        const result = await this.service.reportSalesReturns(options);
        let data: NotInvoiced[] = []
        //let data: NotInvoiced[] = getDataCharges(result, InvoiceModules.STORE, true)
        let dataByClient: NotInvoiced[] = [];

        if (options.byClient) {
            //dataByClient = reportStoreSaleByClient(data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new SaleReturnExcel(options, options.byClient ? dataByClient : data);
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport(options.byClient ? 'Devoluciones_por_cliente' : 'Devoluciones', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport(options.byClient ? 'Devoluciones_por_cliente' : 'Devoluciones', options).excel}`,
            };
            return res.send({ report, data: options.byClient ? dataByClient : data });
        } else {
            return res.send({ report: false, data: options.byClient ? dataByClient : data });
        }
    }
}
