import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreProduct } from '../../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreClassification } from '../../../mini-store-classifications/entities/mini-store-classification.entity';
import { SalesReturnsProducts } from '../../mini-store-sales-returns/entities/sales-returns-products.entity';
import { SchoolChargesDetailsExtraCharges } from '../../../../school-colegio-ingles/charges-school/school-charges-details-extra-charges/entities/school-charges-details-extra-charges.entity';
import { MiniStoreDetailsExtraCharges } from '../../mini-store-details-extra-charges/entities/mini-store-details-extra-charges.entity';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('tie_venta_detalle')
export class MiniStoreSaleDetail extends Base {

    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_producto',
    })
    productCode: string;

    @Column('varchar', {
        nullable: true,
        name: 'product_name',
    })
    productName: string;

    @Column('decimal', {
        nullable: false,
        name: 'cantidad',
        precision: 15,
        scale: 6,
        default: () => '0.000000',
    })
    quantity: number;

    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
    })
    unitMeasurement: number;

    @Column('decimal', {
        nullable: false,
        precision: 15,
        scale: 6,
    })
    priceWithIVA: number;

    @Column('decimal', {
        nullable: false,
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string;

    @Column('tinyint', {
        nullable: false,
        default: 1,
    })
    isIva: boolean;
    
    @ManyToOne(() => MiniStoreSale, (miniStoreSale) => miniStoreSale.miniStoreSaleDetails)
    miniStoreSale: MiniStoreSale;

    @ManyToOne(() => MiniStoreProduct, (miniStoreProduct) => miniStoreProduct.miniStoreSaleDetails)
    miniStoreProduct: MiniStoreProduct;

    @ManyToOne(() => MiniStoreClassification, (miniStoreClassification) => miniStoreClassification.miniStoreSaleDetails)
    miniStoreClassification: MiniStoreClassification;

    @OneToMany(type => SalesReturnsProducts, returnedProduct => returnedProduct.saleDetail)
    returnedProducts: SalesReturnsProducts;

    @OneToMany(() => MiniStoreDetailsExtraCharges, (extraCharges) => extraCharges.miniSaleChargeDetails,
        {
            cascade: ['insert'],
        })
    extraCharges: MiniStoreDetailsExtraCharges[];

}
