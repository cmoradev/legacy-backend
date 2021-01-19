import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { InvoicesBank } from '../../../../system/invoices-bank/entities/invoices-bank.entity';
import { SchoolChargePayment } from '../../school-charges-payments/entities/school-charge-payment.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

/**
 * Esta tabla hacer referencia a metodo de pago pero llama ala tabla forma pago
 */

@ObjectType()
@Entity('school_charges_methods_payments')
export class SchoolChargesMethodsPayments extends Base {
    /**
     * Solo código método pago -> desnormalizado
     */
    @Field()
    @Column('varchar', {
        nullable: false,
        length: 10,
    })
    codePaymentMethod: string;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Field({ nullable: true })
    @Column('date', {
        nullable: true,
    })
    date: Date;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    account: string;

    @Field(type => InvoicesBank)
    @ManyToOne(type => InvoicesBank, bank => bank.schoolChargesMethodsPayments)
    Bank: InvoicesBank;
    /**
     * Relación de un método de pago con una factura de metodo de pago
     */
    @Field(type => InvoiceMethodPayment)
    @ManyToOne(() => InvoiceMethodPayment, (invoicesMethod) => invoicesMethod.schoolChargePaymentMethods)
    invoiceMethodPayment: InvoiceMethodPayment;

    /**
     * Relación de una metodo de pago con una venta
     */
    @Field(type => SchoolChargePayment)
    @ManyToOne(() => SchoolChargePayment, (miniStoreSalePayment) => miniStoreSalePayment.methodsPayments)
    schoolChargePayment: SchoolChargePayment;
}
