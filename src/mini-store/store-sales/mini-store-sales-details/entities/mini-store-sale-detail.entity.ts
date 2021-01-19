import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreProduct } from '../../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreClassification } from '../../../mini-store-classifications/entities/mini-store-classification.entity';
import { SalesReturnsProducts } from '../../mini-store-sales-returns/entities/sales-returns-products.entity';
import { MiniStoreDetailsExtraCharges } from '../../mini-store-details-extra-charges/entities/mini-store-details-extra-charges.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('tie_venta_detalle')
export class MiniStoreSaleDetail extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_producto',
    })
    productCode: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        name: 'product_name',
    })
    productName: string;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        name: 'cantidad',
        precision: 15,
        scale: 6,
        default: () => '0.000000',
    })
    quantity: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
    })
    unitMeasurement: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        precision: 15,
        scale: 6,
    })
    priceWithIVA: number;

    @Field()
    @Column('decimal', {
        nullable: false,
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string;

    @Field()
    @Column('tinyint', {
        nullable: false,
        default: 1,
    })
    isIva: boolean;

    @Field(type => MiniStoreSale)
    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreSaleDetails)
    miniStoreSale: MiniStoreSale;

    @Field(type => MiniStoreProduct)
    @ManyToOne(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.miniStoreSaleDetails)
    miniStoreProduct: MiniStoreProduct;

    @Field(type => MiniStoreClassification)
    @ManyToOne(() => MiniStoreClassification, (miniStoreClassification) => miniStoreClassification.miniStoreSaleDetails)
    miniStoreClassification: MiniStoreClassification;

    @Field(type => SalesReturnsProducts)
    @OneToMany(type => SalesReturnsProducts, returnedProduct => returnedProduct.saleDetail)
    returnedProducts: SalesReturnsProducts;

    @Field(type => [MiniStoreDetailsExtraCharges])
    @OneToMany(() => MiniStoreDetailsExtraCharges, (extraCharges) => extraCharges.miniSaleChargeDetails,
      {
          cascade: ['insert'],
      })
    extraCharges: MiniStoreDetailsExtraCharges[];

}
