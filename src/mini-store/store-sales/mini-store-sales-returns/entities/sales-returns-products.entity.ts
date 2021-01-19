import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { SalesReturns } from './sales-returns.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'sale_return_products' })
export class SalesReturnsProducts extends Base {

    @Field(type => MiniStoreSaleDetail)
    @ManyToOne(type => MiniStoreSaleDetail, saleDetail => saleDetail.returnedProducts, {
        nullable: false,
    })
    saleDetail: MiniStoreSaleDetail;

    @Field(type => Int)
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 15,
        scale: 6,
        default: () => '\'0.000000\'',
    })
    quantity: number;

    @Field()
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 15,
        scale: 6,
        default: () => '\'0.000000\'',
    })
    amount: string;

    @Field(type => SalesReturns)
    @ManyToOne(type => SalesReturns, salesReturns => salesReturns.details, {
        nullable: false,
    })
    saleReturn: SalesReturns;

    @BeforeInsert()
    updateAmount() {
        this.amount = (this.quantity * this.saleDetail.priceWithIVA).toFixed(6) || '0.000000';
    }
}
