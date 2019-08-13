import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {MiniStoreSaleMethodPayment} from '../../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';

@Entity('facturacion_formas_pago' )
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

    @Column('varchar', {
        nullable: false,
        length: 3,
        name: 'codigo',
    })
    code: string;

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
}
