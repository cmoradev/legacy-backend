import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';

@Crud({
    model: {
        type: MiniStoreSaleDetail,
    },
    query: {
        join: {
            miniStoreSale: {},
            miniStoreProduct: {},
            miniStoreClassification: {},
        },
    },
})
@Controller()
export class MiniStoreSalesDetailsController implements CrudController<MiniStoreSaleDetail> {
    constructor(
        readonly service: MiniStoreSalesDetailsService,
    ) {}
    get base(): CrudController<MiniStoreSaleDetail> {
        return this;
    }
}
