import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';

@Crud({
    model: {
        type: MiniStoreSale,
    },
    query: {
        join: {
            miniStoreSalePayments: {},
            miniStoreSaleDetails: {},
        },
    },
})
@Controller()
export class MiniStoreSalesController implements CrudController<MiniStoreSale> {
    constructor(
        readonly service: MiniStoreSalesService,
    ) { }
    get base(): CrudController<MiniStoreSale> {
        return this;
    }
}
