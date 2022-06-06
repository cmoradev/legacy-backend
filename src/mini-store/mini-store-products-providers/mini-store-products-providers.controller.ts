import { Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreProductsProviders } from './entities/mini-store-products-providers.entity';
import { MiniStoreProductsProvidersService } from './mini-store-products-providers.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { MiniStoreProductsService } from '../mini-store-products/mini-store-products.service';
import { mulQuantity } from '../../common/point-of-sale/point-of-sale';
import { MiniStoreProduct } from '../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreWarehouseProvider } from '../mini-store-warehouse-providers/entities/mini-store-warehouse-provider.entity';


@Crud({
    model: {
        type: MiniStoreProductsProviders,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {},
    },
})
@Controller()
export class MiniStoreProductsProvidersController implements CrudController<MiniStoreProductsProviders> {

    constructor(
        readonly service: MiniStoreProductsProvidersService,
        readonly serviceProducts: MiniStoreProductsService,
    ) {
    }

    get base(): CrudController<MiniStoreProductsProviders> {
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

    @Get('update')
    async updateprice() {

        const productos = await this.serviceProducts.repo.createQueryBuilder('product')
            .leftJoinAndSelect('product.storeClassification', 'storeClassification')
            .where('storeClassification.id=1')
            .getMany();
        const data = [];
        let i = 1;
        for (const product of productos) {
            const produ = new MiniStoreProductsProviders();
            produ.provider = { id: 1 } as MiniStoreWarehouseProvider;
            produ.product = { id: product.id } as MiniStoreProduct;
            produ.supplierPrice = mulQuantity(product.priceWithIVA, .70).toString();

            i++;
        }
        return data;
    }
}
