import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreWarehouseProvider } from '../../mini-store-warehouse-providers/entities/mini-store-warehouse-provider.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('tie_products_of_providers')
export class MiniStoreProductsProviders extends Base {

    @Field(type => MiniStoreProduct)
    @ManyToOne(() => MiniStoreProduct, (product) => product.miniStoreProductsProvider)
    product: MiniStoreProduct;

    @Field(type => MiniStoreWarehouseProvider)
    @ManyToOne(() => MiniStoreWarehouseProvider, (provider) => provider.miniStoreProductsProvider)
    provider: MiniStoreWarehouseProvider;

    @Field({ nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'supplierPrice',
    })
    supplierPrice: string | null;

}
