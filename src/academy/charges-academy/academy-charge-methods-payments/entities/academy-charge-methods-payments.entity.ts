import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { InvoicesBank } from '../../../../system/invoices-bank/entities/invoices-bank.entity';
import { AcademyChargePayments } from '../../academy-charge-payments/entities/academy-charge-payments.entity';

@Entity('ac_charges_methods_payments')
export class AcademyChargeMethodsPayments extends Base {

    @Column('varchar', {
        nullable: false,
        length: 10,
    })
    codePaymentMethod: string;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Column('date', {
        nullable: true,
    })
    date: Date;

    @Column('varchar', {
        nullable: true,
    })
    account: string;

    @ManyToOne(type => InvoicesBank, bank => bank.schoolChargesMethodsPayments)
    Bank: InvoicesBank;

    @ManyToOne(() => InvoiceMethodPayment, (invoicesMethod) => invoicesMethod.schoolChargePaymentMethods)
    invoiceMethodPayment: InvoiceMethodPayment;

    /**
     * Relación de una metodo de pago con una venta
     */

    @ManyToOne(() => AcademyChargePayments, (acChargePayments) => acChargePayments.methodsPayments)
    academyChargePayment: AcademyChargePayments;
}
