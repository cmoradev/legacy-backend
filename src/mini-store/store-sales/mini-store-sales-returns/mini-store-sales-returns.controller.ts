import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SalesReturns } from './entities/sales-returns.entity';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';

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
        limit: 10,
        join: {
            sale: {eager: false},
            details: {eager: false},
            agent: {eager: false},
            invoices: {eager: false},
            paymentMethod: {eager: false},
            'details.saleDetail': {eager: false},
            'details.saleDetail.miniStoreProduct': {eager: false},
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