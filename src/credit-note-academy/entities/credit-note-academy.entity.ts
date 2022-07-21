import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AcademyChargeInvoice } from '../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { DateTimeZoneTransformer } from '../../common/orm/entities/transformers/date-time-zone.transformer';
import { InvoiceStatus } from '../../invoice/types/invoice-status';
import { InvoiceType } from '../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { BranchOffice } from '../../system/branch-office/entities/branch-office.entity';
import { User } from '../../system/users/entities/user.entity';

@Entity()
export class CreditNoteAcademy {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @CreateDateColumn({
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamp'})
    deletedAt: Date;


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
    })
    rfc: string | null;

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'total',
    })
    total: number | null;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    cancellationDate: Date | null;

    @Column('text', {
        nullable: true,
        name: 'motivo_cancelacion',
    })
    reasonCancellation: string | null;

    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceType.expenses,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceStatus.Unbilled,
        enum: InvoiceStatus,
    })
    status: InvoiceStatus;

    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStoreInvoice)
    invoiceBranchOffice: BranchOffice;

    @ManyToOne(() => User, (user) => user.miniStoreBillingInvoices)
    agentBilling: User;

    @ManyToOne(() => User, (user) => user.miniStoreCancelingInvoices)
    agentCanceling: User;

    @OneToMany(() => AcademyChargeInvoice, (academyInvoice) => academyInvoice.creditNoteAcademy)
    invoicesAcademy: AcademyChargeInvoice[];
}
