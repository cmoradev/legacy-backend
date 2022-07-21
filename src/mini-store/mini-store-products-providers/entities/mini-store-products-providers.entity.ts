import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreWarehouseProvider } from '../../mini-store-warehouse-providers/entities/mini-store-warehouse-provider.entity';

@Entity('tie_products_of_providers')
export class MiniStoreProductsProviders extends Base {

    @ManyToOne(() => MiniStoreProduct, (product) => product.miniStoreProductsProvider)
    product: MiniStoreProduct;

    @ManyToOne(() => MiniStoreWarehouseProvider, (provider) => provider.miniStoreProductsProvider)
    provider: MiniStoreWarehouseProvider;

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'supplierPrice',
    })
    supplierPrice: string | null;

}
