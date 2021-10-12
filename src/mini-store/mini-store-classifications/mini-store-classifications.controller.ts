import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { MiniStoreClassificationsService } from './mini-store-classifications.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
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
        join: {
            storeProducts: {},
            miniStoreSaleDetails: {},
            branchOffice: {
                alias: 'branchOffice',
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
