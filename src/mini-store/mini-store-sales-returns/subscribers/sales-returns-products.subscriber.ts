import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { SalesReturnsProducts } from '../entities/sales-returns-products.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';

@EventSubscriber()
export class SalesReturnsProductsSubscriber implements EntitySubscriberInterface<SalesReturnsProducts> {
    listenTo() {
        return SalesReturnsProducts;
    }

    afterInsert(saleReturnProduct: InsertEvent<SalesReturnsProducts>) {
        saleReturnProduct.connection.getRepository<MiniStoreSaleDetail>(MiniStoreSaleDetail).findOne({
            relations: ['miniStoreProduct'],
            where: [{ id: saleReturnProduct.entity.saleDetail.id }],
        }).then((miniStoreSaleDetail) => {
            if (miniStoreSaleDetail) {
                const { miniStoreProduct: product } = miniStoreSaleDetail;
                saleReturnProduct.connection.getRepository<MiniStoreProduct>(MiniStoreProduct).update({
                    id: product.id,
                }, {
                    stock: (this.toNumber(product.stock) + this.toNumber(saleReturnProduct.entity.quantity)),
                });
            }
        });
    }

    public toNumber(value: string | number) {
        return +value;
    }
}
