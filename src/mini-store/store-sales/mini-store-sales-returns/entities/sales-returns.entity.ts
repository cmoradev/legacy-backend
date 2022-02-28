import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, VersionColumn } from 'typeorm';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { SalesReturnsProducts } from './sales-returns-products.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { MiniStoreInvoice } from '../../mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoicementStatusEnum } from '../../mini-store-invoices/enums/invoicement-status.enum';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { MultNumber } from '@signati/sdk-node/lib/util';
import { add } from 'exact-math';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'sale_returns' })
export class SalesReturns extends Base {

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: '0000-0',
    })
    folio: string;

    @Field({ nullable: true })
    @Column({
        type: 'text',
        nullable: true,
    })
    comments: string;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoicementStatusEnum.Unbilled,
        enum: InvoicementStatusEnum,
    })
    invoiceStatus: InvoicementStatusEnum;

    @Field()
    @Column({
        type: 'decimal',
        nullable: false,
        precision: 15,
        scale: 6,
        default: () => '\'0.000000\'',
    })
    amount: string;

    @Field(type => InvoiceMethodPayment)
    @ManyToOne(type => InvoiceMethodPayment, method => method.salesReturns)
    paymentMethod: InvoiceMethodPayment;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.salesReturns, {
        nullable: false,
    })
    agent: User;

    @Field(type => MiniStoreSale)
    @ManyToOne(type => MiniStoreSale, sale => sale.returnedProducts, {
        nullable: false,
    })
    sale: MiniStoreSale;

    @Field(type => [MiniStoreInvoice])
    @OneToMany(type => MiniStoreInvoice, invoice => invoice.saleReturn)
    invoices: MiniStoreInvoice[];

    @Field(type => [SalesReturnsProducts])
    @OneToMany(type => SalesReturnsProducts, salesReturnsProducts => salesReturnsProducts.saleReturn, {
        nullable: false,
        cascade: ['insert', 'update'],
    })
    details: SalesReturnsProducts[];

    @BeforeInsert()
    updateAmount() {
        this.amount = this.details.reduce((amount, detail) => {
            return add(amount, MultNumber(detail.quantity, detail.saleDetail.priceWithIVA));
        }, 0).toFixed(6) || '0.000000';

        this.details = this.details.map<SalesReturnsProducts>(salesReturnProduct => {
            const { quantity, saleDetail } = salesReturnProduct;
            salesReturnProduct.amount = MultNumber(quantity, saleDetail.priceWithIVA) || '0.000000';
            return {
                ...salesReturnProduct,
            } as any;
        });
    }

}
