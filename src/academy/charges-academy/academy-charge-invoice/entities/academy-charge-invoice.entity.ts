import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { InvoiceType } from '../../../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { User } from '../../../../system/users/entities/user.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';
import { AcademyChargePayments } from '../../academy-charge-payments/entities/academy-charge-payments.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceStatus } from '../../../../invoice/types/invoice-status';
import { Base } from '../../../../common/orm/entities/base.entity';
import { CreditNoteAcademy } from '../../../../credit-note-academy/entities/credit-note-academy.entity';
import { InvoiceGlobalEnum } from '../../../../common/enums/InvoiceGlobal.enum';

@Entity('ac_facturas')
export class AcademyChargeInvoice extends Base {
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceGlobalEnum.IS_NOT_GLOBAL,
        enum: InvoiceGlobalEnum,
    })
    isGlobal: InvoiceGlobalEnum;

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
        name: 'status',
    })
    status: InvoiceStatus;

    @Column({
        nullable: true,
        name: 'motivo',
    })
    motivo: string | null;

    @Column({
        nullable: true,
        name: 'folioSustitucion',
    })
    folioSustitucion: string | null;

    @Column({
        type: 'varchar',
        length: 36,
        nullable: true,
        name: 'pending_stamp_uuid',
    })
    pendingStampUuid: string | null;

    @Column({
        type: 'datetime',
        nullable: true,
        name: 'pending_stamp_at',
    })
    pendingStampAt: Date | null;

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

    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeAcademyInvoice)
    @JoinColumn({
        name: 'invoiceBranchOfficeId',
        referencedColumnName: 'id',
    })
    invoiceBranchOffice: BranchOffice;

    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettAcademyInvoice)
    invoiceBranchOfficeSet: BranchOfficeSetting;

    @ManyToMany(() => CreditNoteAcademy, (creditNoteAcademy) => creditNoteAcademy.invoicesAcademy, { cascade: true })
    @JoinTable({
        name: 'credit_notes_academy_invoices'
    })
    creditNotesAcademy: CreditNoteAcademy[];
}
