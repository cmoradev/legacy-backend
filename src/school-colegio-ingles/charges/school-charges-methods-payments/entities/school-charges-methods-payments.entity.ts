import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { InvoicesBank } from '../../../../system/invoices-bank/entities/invoices-bank.entity';
import { SchoolChargePayment } from '../../school-charges-payments/entities/school-charge-payment.entity';

/**
 * Esta tabla hacer referencia a metodo de pago pero llama ala tabla forma pago
 */
@Entity('school-charges-methods-payments')
export class SchoolChargesMethodsPayments extends Base {
    /**
     * Solo código método pago -> desnormalizado
     */
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

    @ManyToOne(type => InvoicesBank, bank => bank.schoolChargesMethodsPayments)
    Bank: InvoicesBank;

    @Column('date', {
        nullable: true,
        default: () => new Date().toTimeString(),
    })
    date: string | null;

    @Column('varchar', {
        nullable: false,
        length: 90,
        default: () => '',
    })
    account: string;
    /**
     * Relación de un método de pago con una factura de metodo de pago
     */
    @ManyToOne(() => InvoiceMethodPayment, (invoicesMethod) => invoicesMethod.schoolChargePaymentMethods)
    invoiceMethodPayment: InvoiceMethodPayment;

    /**
     * Relación de una metodo de pago con una venta
     */
    @ManyToOne(() => SchoolChargePayment, (miniStoreSalePayment) => miniStoreSalePayment.methodsPayments)
    schoolChargePayment: SchoolChargePayment;
}
