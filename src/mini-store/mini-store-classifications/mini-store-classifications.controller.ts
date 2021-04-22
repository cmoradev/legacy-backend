import { Controller, UseGuards } from '@nestjs/common';
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
        join: {
            storeProducts: {},
            miniStoreSaleDetails: {},
            branchOffice: {
                alias: 'branchOffice'
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
}
