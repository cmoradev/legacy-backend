import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { SalesReturns } from '../../../mini-store/store-sales/mini-store-sales-returns/entities/sales-returns.entity';
import { SchoolChargeDetails } from '../../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('facturacion_formas_pago')
export class InvoiceMethodPayment extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'nombre',
    })
    name: string;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'showReport',
    })
    showReport: number;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 3,
        name: 'codigo',
    })
    code: string;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'isActive',
    })
    isActive: number;

    @Field(type => [MiniStoreSaleMethodPayment])
    @OneToMany(() => MiniStoreSaleMethodPayment, (miniStoreSaleMethodPayment) => miniStoreSaleMethodPayment.invoiceMethodPayment)
    miniStoreSaleMethodPayments: MiniStoreSaleMethodPayment[];

    @Field(type => [MiniStoreSaleMethodPayment])
    @OneToMany(type => MiniStoreSaleMethodPayment, salePaymentMethod => salePaymentMethod.invoiceMethodPayment)
    salesPaymentMethods: MiniStoreSaleMethodPayment[];

    @Field(type => [MiniStoreSaleMethodPayment])
    @OneToMany(type => MiniStoreSaleMethodPayment, salePaymentMethod => salePaymentMethod.invoiceMethodPayment)
    schoolChargePaymentMethods: MiniStoreSaleMethodPayment[];

    @Field(type => [SalesReturns])
    @OneToMany(type => SalesReturns, salesReturns => salesReturns.paymentMethod)
    salesReturns: SalesReturns[];

    @Field(type => [BranchOfficeSetting])
    @OneToMany(type => BranchOfficeSetting, bOS => bOS.quickSaleMethod)
    methodPayBranchOffSet: BranchOfficeSetting[];
}
