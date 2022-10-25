import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { totalForCashier, totalForCategory, totalForProducts } from './reports/mini-store-sale.report';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { SaleReport } from './types/SaleReport';
import { QuerySimpleReport } from '../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { MiniStoreQuotationService } from '../mini-store-quotation/mini-store-quotation.service';
import { MiniStoreQuotation } from '../mini-store-quotation/entities/mini-store-quotation.entity';
import { IQueryReportSaleToday, IReportSaleTodayRow } from './types/IReport';
import { getNameReport } from './reports/helpers';
import { SaleTodayExcel } from './reports/sale.today.excel';
import {InformativeExcel} from './reports/informative.excel';

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
            cashier: {eager: false},
            student: {eager: false},
            storeBranchOffice: {eager: false},
            storeBranchOfficeSet: {eager: false},
            miniStoreSalePayments: {eager: false},
            'miniStoreSalePayments.miniStoreInvoices': {
                alias: 'miniStoreSalePayments_miniStoreInvoices',
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
            miniStoreSaleDetails: {eager: false},
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
            miniStoreInvoices: {eager: false},
            returnedProducts: {eager: false},
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
            agentBilling: {eager: false},
            agentCanceling: {eager: false},
            quotation: {eager: false},
            'quotation.quotation': {eager: false},
            sale: {eager: false},
            'sale.cashier': {eager: false},
        },

    },
})
@Controller()
export class MiniStoreSalesController implements CrudController<MiniStoreSale> {
    constructor(
        readonly service: MiniStoreSalesService,
        readonly paymentService: MiniStoreSalesPaymentsService,
        readonly miniStoreQuotationService: MiniStoreQuotationService,
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

    @Override()
    async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: MiniStoreSale) {
        let isCompleteCo = false;
        let pivote = {} as MiniStoreQuotation;
        if (dto.statusSale === 2 && dto.quotation) {
            if (dto.quotation.quotation) {
                pivote = Object.assign(dto.quotation);
                delete dto.quotation;
                isCompleteCo = true;
            }
        }
        const miniStoreSale = await this.base.createOneBase(req, dto);

        if (isCompleteCo) {
            const quotation = {} as MiniStoreQuotation;
            const qu = await this.miniStoreQuotationService.findQuotation(pivote.quotation.id);
            if (qu) {
                quotation.id = qu.id;
                quotation.sale = {
                    id: miniStoreSale.id,
                } as MiniStoreSale;
                quotation.quotation = {
                    id: pivote.quotation.id,
                    isComplete: 1,
                } as MiniStoreSale;
                await this.miniStoreQuotationService.updateQuotation(quotation);
            }
        }
        return miniStoreSale;
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
      @Query() options: IQueryReportSaleToday,
    ) {
      const result = await this.service.reportSaleToday(options);
      const data = result.map((d: any)=>{
        let idsPagos = [];
        let idsDetalles = [];

        d.idsPagos != null ? idsPagos = d.idsPagos.split(',') : null;
        d.idsDetalles != null ? idsDetalles = d.idsDetalles.split(',') : null;
        return {...d,id_estado_pago: parseInt(`${d.id_estado_pago}`), idsPagos: idsPagos.map((p: string)=>{return parseInt(`${p}`)}),idsDetalles: idsDetalles.map((p: string)=>{return parseInt(`${p}`)})} as IReportSaleTodayRow
      });
      
      if (options?.isExported) {
        const conceptStatusExcel = new SaleTodayExcel(options, data);
        const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
          filename: `${getNameReport('Ventas',options).excel}.xlsx`,
        });
        const report = {
          src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
            buffer,
          ).toString('base64')}`,
          type: 'excel',
          name: `${getNameReport('Ventas', options).excel}`,
        };
        return res.send({ report, data });
      } else {
        return res.send({ report: false, data });
      }
    }

    @Get('report-informative')
    private async reportInformative(
        @Res() res,
        @Query() options: IQueryReportSaleToday,
    ){
        const result = await this.service.reportInformative(options);

        if(options?.isExported) {
            const conceptStatusExcel = new InformativeExcel(options, result);
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport('Información_producto', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport('Información_producto', options).excel}`,
            };
            return res.send({ report, result });
        } else {
            return res.send({ report: false, result });
        }
    }
}
