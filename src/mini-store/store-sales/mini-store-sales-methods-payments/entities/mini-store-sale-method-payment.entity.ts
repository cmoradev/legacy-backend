import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { Shift } from '../../../../system/shift/entities/shift.entity';
import { InvoicesBank } from '../../../../system/invoices-bank/entities/invoices-bank.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * Esta tabla hacer referencia a metodo de pago pero llama ala tabla forma pago
 */
@ObjectType()
@Entity('tie_venta_forma_pago')
export class MiniStoreSaleMethodPayment extends Base {

    /**
     * Relación con la forma pago
     */

        // @Column('int', {
        //     nullable: false,
        //     name: 'id_forma_pago',
        // })
        // idWayToPay: number;
    @Field(type => InvoiceMethodPayment)
    @ManyToOne(type => InvoiceMethodPayment, invoiceMethod => invoiceMethod.salesPaymentMethods)
    @JoinColumn({
        name: 'id_forma_pago',
        referencedColumnName: 'id',
    })
    invoiceMethod: InvoiceMethodPayment;

    /**
     * Solo código método pago -> desnormalizado
     */

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'codigo_forma_pago',
    })
    codePaymentMethod: string;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cantidad',
    })
    quantity: number;

    @Field(type => InvoicesBank)
    @ManyToOne(type => InvoicesBank, bank => bank.SalesMethodPayment)
    @JoinColumn({
        name: 'id_banco',
        referencedColumnName: 'id',
    })
    Bank: InvoicesBank;

    @Field()
    @Column('date', {
        nullable: true,
        name: 'fecha',
    })
    date: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 90,
        name: 'cuenta',
        default: () => '\'\'',
    })
    account: string;

    /**
     * Deprecated
     */
    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_tie_venta',
    })
    idSale: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_pago',
    })
    idPayment: number;

    /**
     * Relación de un método de pago con una factura de metodo de pago
     */
    @Field(type => InvoiceMethodPayment)
    @ManyToOne(() => InvoiceMethodPayment, (invoicesMethodPayment) => invoicesMethodPayment.miniStoreSaleMethodPayments)
    invoiceMethodPayment: InvoiceMethodPayment;

    /**
     * Relación de una metodo de pago con una venta
     */
    @Field(type => MiniStoreSalePayment)
    @ManyToOne(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreSaleMethodPayments)
    @JoinColumn({
        name: 'salePaymentId',
        referencedColumnName: 'id',
    })
    miniStoreSalePayment: MiniStoreSalePayment;
}
