import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { MiniStoreClassificationsService } from './mini-store-classifications.service';

@Crud({
    model: {
        type: MiniStoreClassification,
    },
    query: {
        join: {
            storeProducts: {},
            miniStoreSaleDetails: {},
            BranchOffice: { alias: 'branchId' },
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
