import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { SalesReturns } from './sales-returns.entity';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity({ name: 'sale_return_products' })
export class SalesReturnsProducts extends Base {

    @ManyToOne(type => MiniStoreSaleDetail, saleDetail => saleDetail.returnedProducts, {
        nullable: false,
    })
    saleDetail: MiniStoreSaleDetail;

    @Column({
        type: 'decimal',
        nullable: false,
        precision: 15,
        scale: 6,
        default: () => '\'0.000000\'',
    })
    quantity: number;

    @Column({
        type: 'decimal',
        nullable: false,
        precision: 15,
        scale: 6,
        default: () => '\'0.000000\'',
    })
    amount: string;

    @ManyToOne(type => SalesReturns, salesReturns => salesReturns.details, {
        nullable: false,
    })
    saleReturn: SalesReturns;

    @BeforeInsert()
    updateAmount() {
        this.amount = (this.quantity * this.saleDetail.priceWithIVA).toFixed(6) || '0.000000';
    }
}
