import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreQuotation } from './entities/mini-store-quotation.entity';
import { MiniStoreQuotationService } from './mini-store-quotation.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreQuotation,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            sale: {},
            quotation: {},
        },
    },
})
@Controller()
export class MiniStoreQuotationController implements CrudController<MiniStoreQuotation> {
    constructor(
        readonly service: MiniStoreQuotationService,
    ) {
    }

    get base(): CrudController<MiniStoreQuotation> {
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
