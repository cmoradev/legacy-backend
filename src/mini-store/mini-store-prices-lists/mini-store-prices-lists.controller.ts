import { Controller, UseGuards } from '@nestjs/common';
import { MiniStorePricesListsService } from './mini-store-prices-lists.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStorePriceList } from './entities/mini-store-price-list.entity';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

//@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStorePriceList,
    },
    query: {
        join: {
            storeProducts: {},
            branchOfficeList: {},
        },
    },
})
@Controller()
export class MiniStorePricesListsController implements CrudController<MiniStorePriceList> {
    constructor(
        readonly service: MiniStorePricesListsService,
    ) {
    }

    get base(): CrudController<MiniStorePriceList> {
        return this;
    }

}
