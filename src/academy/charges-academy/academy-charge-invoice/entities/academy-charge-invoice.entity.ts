import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceType } from '../../../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { User } from '../../../../system/users/entities/user.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';
import { AcademyChargePayments } from '../../academy-charge-payments/entities/academy-charge-payments.entity';

@Entity('ac_facturas')
export class AcademyChargeInvoice {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        name: 'folio',
    })
    folio: string | null;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'uuid',
    })
    uuid: string;

    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'razon_social',
    })
    businessName: string | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'rfc',
    })
    rfc: string | null;

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'total',
    })
    total: string | null;

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
        default: () => '\'1\'',
        name: 'status',
    })
    status: number;

    @Column({
        type: 'enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @ManyToOne(() => User, (user) => user.schoolChargesBillingInvoices)
    @JoinColumn({
        name: 'id_agente_facturador',
        referencedColumnName: 'id',
    })
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.schoolChargesCancelingInvoices)
    @JoinColumn({
        name: 'id_agente_cancelador',
        referencedColumnName: 'id',
    })
    agentCanceling: User;

    @ManyToOne(() => AcademyChargePayments, (schoolChargePayment) => schoolChargePayment.academyChargesInvoice)
    academyChargePayment: AcademyChargePayments;

    @ManyToOne(() => AcademyCharge, (academyCharge) => academyCharge.chargesInvoice)
    @JoinColumn({
        name: 'id_ac_cobro',
        referencedColumnName: 'id',
    })
    academyCharge: AcademyCharge;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_plantel',
    })
    idPlantel: number;

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

}
