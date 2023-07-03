import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DateTimeZoneTransformer } from '../../common/orm/entities/transformers/date-time-zone.transformer';
import { InvoiceStatus } from '../../invoice/types/invoice-status';
import { MiniStoreInvoice } from '../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoiceType } from '../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { BranchOffice } from '../../system/branch-office/entities/branch-office.entity';
import { User } from '../../system/users/entities/user.entity';
import {Base} from '../../common/orm/entities/base.entity';

@Entity()
export class CreditNoteStore extends Base {

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

    @DeleteDateColumn({ type: 'timestamp' })
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
        default: InvoiceType.income,
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

    @ManyToMany(() => MiniStoreInvoice, miniStoreInvoice => miniStoreInvoice.creditNotesStore)
    invoicesStore: MiniStoreInvoice[];
}
