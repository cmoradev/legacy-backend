import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { InvoiceType } from '../../../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { SchoolChargePayment } from '../../school-charges-payments/entities/school-charge-payment.entity';
import { MiniStoreSalePayment } from '../../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSale } from '../../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { User } from '../../../../system/users/entities/user.entity';

@Entity('school_charges_invoice')
export class SchoolChargesInvoice extends Base {

    @Column('varchar', {
        nullable: true,
    })
    folio: string | null;

    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    uuid: string;

    @Column('varchar', {
        nullable: true,
        length: 300,
    })
    businessName: string | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
    })
    rfc: string | null;

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    total: number | null;

    @Column('timestamp', {
        nullable: true,
        name: 'fecha_cancelacion',
    })
    cancellationDate: Date | null;

    @Column('text', {
        nullable: true,
        name: 'motivo_cancelacion',
    })
    reasonCancellation: string | null;

    @Column('tinyint', {
        nullable: false,
        default: () => '1',
        name: 'status',
    })
    status: number;

    @Column('int', {
        nullable: false,
        default: () => '0',
        name: 'id_plantel',
    })
    idPlantel: number;

    @Column({
        type: 'enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    /**
     * Relación que corresponde al la factura al pago de una venta
     */
    @ManyToOne(() => SchoolChargePayment, (schoolChargePayment) => schoolChargePayment.schoolChargesInvoice)
    schoolChargePayment: SchoolChargePayment;

    @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesInvoice)
    schoolCharge: SchoolCharge;

    @ManyToOne(() => User, (user) => user.schoolChargesBillingInvoices)
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.schoolChargesCancelingInvoices)
    agentCanceling: User;
}
