import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {MiniStoreSalePayment} from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import {InvoiceMethodPayment} from '../../invoices-methods-payments/entities/invoice-method-payment.entity';

/**
 * Esta tabla hacer referencia a metodo de pago pero llama ala tabla forma pago
 */
@Entity('tie_venta_forma_pago' )
export class MiniStoreSaleMethodPayment {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    /**
     * Relación con la forma pago
     */

    @Column('int', {
        nullable: false,
        name: 'id_forma_pago',
    })
    idWayToPay: number;

    /**
     * Solo código método pago -> desnormalizado
     */
    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'codigo_forma_pago',
    })
    codePaymentMethod: string;

    @Column('float', {
        nullable: false,
        name: 'cantidad',
    })
    quantity: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_banco',
    })
    idBank: number;

    @Column('date', {
        nullable: true,
        name: 'fecha',
    })
    date: string | null;

    @Column('varchar', {
        nullable: false,
        length: 90,
        name: 'cuenta',
    })
    account: string;

    /**
     * Deprecated
     */
    @Column('int', {
        nullable: false,
        name: 'id_tie_venta',
    })
    idSale: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_tie_pago',
    })
    idPayment: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    /**
     * Relación de un método de pago con una factura de metodo de pago
     */
    @ManyToOne(() => InvoiceMethodPayment, (invoicesMethodPayment) => invoicesMethodPayment.miniStoreSaleMethodPayments)
    invoiceMethodPayment: InvoiceMethodPayment;

    /**
     * Relación de una metodo de pago con una venta
     */
    @ManyToOne(() => MiniStoreSalePayment, (miniStoreSalePayment) => miniStoreSalePayment.miniStoreSaleMethodPayments)
    miniStoreSalePayment: MiniStoreSalePayment;
}
