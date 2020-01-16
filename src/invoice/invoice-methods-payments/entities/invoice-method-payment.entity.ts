import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { SalesReturns } from '../../../mini-store/mini-store-sales-returns/entities/sales-returns.entity';

@Entity('facturacion_formas_pago')
export class InvoiceMethodPayment {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'nombre',
    })
    name: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'showReport',
    })
    showReport: string;

    @Column('varchar', {
        nullable: false,
        length: 3,
        name: 'codigo',
    })
    code: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'isActive',
    })
    isActive: string;

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

    @OneToMany(() => MiniStoreSaleMethodPayment, (miniStoreSaleMethodPayment) => miniStoreSaleMethodPayment.invoiceMethodPayment)
    miniStoreSaleMethodPayments: MiniStoreSaleMethodPayment[];

    @OneToMany(type => MiniStoreSaleMethodPayment, salePaymentMethod => salePaymentMethod.invoiceMethodPayment)
    salesPaymentMethods: MiniStoreSaleMethodPayment[];

    @OneToMany(type => SalesReturns, salesReturns => salesReturns.paymentMethod)
    salesReturns: SalesReturns[];
}
