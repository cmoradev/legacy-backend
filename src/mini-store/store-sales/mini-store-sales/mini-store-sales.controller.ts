import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { totalForCashier, totalForCategory, totalForProducts } from './reports/mini-store-sale.report';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { SaleReport } from './types/SaleReport';
import { QuerySimpleReport } from '../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { MiniStoreQuotationService } from '../mini-store-quotation/mini-store-quotation.service';
import { MiniStoreQuotation } from '../mini-store-quotation/entities/mini-store-quotation.entity';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
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
        join: {
            cashier: {},
            student: {},
            storeBranchOffice: {},
            storeBranchOfficeSet: {},
            miniStoreSalePayments: {},
            'miniStoreSalePayments.miniStoreInvoices': {
                alias: 'miniStoreSalePayments_miniStoreInvoices',
            },
            'miniStoreSalePayments.agent': {
                alias: 'miniStoreSalePayments_agent',
            },
            'miniStoreSalePayments.miniStoreSaleMethodPayments': {

                alias: 'miniStoreSalePayments_miniStoreSaleMethodPayments',
            },
            'miniStoreSalePayments.miniStoreSaleMethodPayments.Bank': {
                alias: 'miniStoreSaleMethodPayments_Bank',
            },
            'miniStoreSalePayments.miniStoreSaleMethodPayments.invoiceMethodPayment': {
                alias: 'miniStoreSaleMethodPayments_invoiceMethodPayment',
            },
            miniStoreSaleDetails: {},
            'miniStoreSaleDetails.miniStoreClassification': {
                alias: 'miniStoreSaleDetails_miniStoreClassification',
            },
            'miniStoreSaleDetails.miniStoreProduct': {
                alias: 'miniStoreSaleDetails_miniStoreProduct',
            },
            'miniStoreSaleDetails.extraCharges': {
                alias: 'miniStoreSaleDetails_extraCharges',
            },
            miniStoreInvoices: {},
            returnedProducts: {},
            'returnedProducts.agent': {
                alias: 'returnedProducts_agent',
            },
            'returnedProducts.invoices': {
                alias: 'returnedProducts_invoices',
            },
            'returnedProducts.details': {
                alias: 'returnedProducts_details',
            },
            'returnedProducts.details.saleDetail': {
                alias: 'details_saleDetail',
            },
            agentBilling: {},
            agentCanceling: {},
            quotation: {},
            'quotation.quotation': {},
            sale: {},
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
}
