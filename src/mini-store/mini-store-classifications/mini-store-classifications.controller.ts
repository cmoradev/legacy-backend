import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { MiniStoreClassificationsService } from './mini-store-classifications.service';

@Crud({
    model: {
        type: MiniStoreClassification,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            storeProducts: {eager: false},
            miniStoreSaleDetails: {eager: false},
            branchOffice: {
                alias: 'branchOffice',
                eager: false
            },
        },
    },
})
@Controller()
export class MiniStoreClassificationsController implements CrudController<MiniStoreClassification> {
    constructor(
        readonly service: MiniStoreClassificationsService,
    ) {
    }

    get base(): CrudController<MiniStoreClassification> {
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
