import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SalesReturns } from './entities/sales-returns.entity';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';
import { InvoiceSaleReturnDto } from './dto/invoice-sale-return.dto';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { Response } from 'express';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: SalesReturns,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            sale: {},
            details: {},
            agent: {},
            invoices: {},
            paymentMethod: {},
            'details.saleDetail': {},
            'details.saleDetail.miniStoreProduct': {},
        },
    },
})
@Controller()
export class MiniStoreSalesReturnsController implements CrudController<SalesReturns> {
    constructor(public service: MiniStoreSalesReturnsService,
        public serviceInvoiveMini: MiniStoreInvoicesService,
        public serviceInvoiceCompany: BranchOfficeSettingService) {
    }

    get base(): CrudController<SalesReturns> {
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
}
