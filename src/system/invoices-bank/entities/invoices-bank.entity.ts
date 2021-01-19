import { Column, Entity, OneToMany } from 'typeorm';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';

import { SchoolChargesMethodsPayments } from '../../../school-colegio-ingles/charges-school/school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('facturacion_bancos')
export class InvoicesBank extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'nombre',
    })
    name: string;

    @Field(type => [MiniStoreSaleMethodPayment])
    @OneToMany(() => MiniStoreSaleMethodPayment, (SalesMethodPayment) => SalesMethodPayment.Bank)
    SalesMethodPayment: MiniStoreSaleMethodPayment[];

    @Field(type => [SchoolChargesMethodsPayments])
    @OneToMany(() => SchoolChargesMethodsPayments, (ChargesMethodsPayments) => ChargesMethodsPayments.Bank)
    schoolChargesMethodsPayments: SchoolChargesMethodsPayments[];
}
