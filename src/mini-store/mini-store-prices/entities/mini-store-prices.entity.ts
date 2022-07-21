import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStorePriceList } from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';

@Entity('tie_products_of_priceslists')
export class MiniStorePrices extends Base {


    @ManyToOne(() => MiniStoreProduct, (product) => product.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'productId',
        referencedColumnName: 'id',
    })
    product: MiniStoreProduct;

    @ManyToOne(() => MiniStorePriceList, (pricelist) => pricelist.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'priceListId',
        referencedColumnName: 'id',
    })
    priceList: MiniStorePriceList;

    @ManyToOne(() => Cycle, (cycle) => cycle.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'cycleId',
        referencedColumnName: 'id',
    })
    cycle: Cycle;

    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio_con_iva',
    })
    priceWithIVA: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'iva',
    })
    IVA: boolean;

}
