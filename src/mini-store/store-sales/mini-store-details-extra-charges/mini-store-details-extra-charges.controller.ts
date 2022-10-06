import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreDetailsExtraCharges } from './entities/mini-store-details-extra-charges.entity';
import { MiniStoreDetailsExtraChargesService } from './mini-store-details-extra-charges.service';

@Crud({
    model: {
        type: MiniStoreDetailsExtraCharges,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            miniSaleChargeDetails: {eager: false},
            systemExtraCharges: {eager: false},
        },
    },
})
@Controller('school-charges-details-extra-charges')
export class MiniStoreDetailsExtraChargesController implements CrudController<MiniStoreDetailsExtraCharges> {
    constructor(
        readonly service: MiniStoreDetailsExtraChargesService,
    ) {
    }

    get base(): CrudController<MiniStoreDetailsExtraCharges> {
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
