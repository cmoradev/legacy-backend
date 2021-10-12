import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStorePriceList } from '../../mini-store-prices-lists/entities/mini-store-price-list.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';

@ObjectType()
@Entity('tie_products_of_priceslists')
export class MiniStorePrices extends Base {


    @Field(type => MiniStoreProduct)
    @ManyToOne(() => MiniStoreProduct, (product) => product.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'productId',
        referencedColumnName: 'id',
    })
    product: MiniStoreProduct;

    @Field(type => MiniStorePriceList)
    @ManyToOne(() => MiniStorePriceList, (pricelist) => pricelist.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'priceListId',
        referencedColumnName: 'id',
    })
    priceList: MiniStorePriceList;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'cycleId',
        referencedColumnName: 'id',
    })
    cycle: Cycle;

    @Field({ nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: string | null;

    @Field()
    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
        name: 'precio_con_iva',
    })
    priceWithIVA: string;

    @Field()
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'iva',
    })
    IVA: boolean;

}