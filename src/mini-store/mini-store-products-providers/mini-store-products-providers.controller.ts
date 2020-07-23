import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreProductsProviders } from './entities/mini-store-products-providers.entity';
import { MiniStoreSalesService } from '../store-sales/mini-store-sales/mini-store-sales.service';
import { MiniStoreProductsProvidersService } from './mini-store-products-providers.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreProductsProviders,
    },
    query: {
        join: {},
    },
})
@Controller()
export class MiniStoreProductsProvidersController implements CrudController<MiniStoreProductsProviders> {

    constructor(
        readonly service: MiniStoreProductsProvidersService,
    ) {
    }

    get base(): CrudController<MiniStoreProductsProviders> {
        return this;
    }
}
