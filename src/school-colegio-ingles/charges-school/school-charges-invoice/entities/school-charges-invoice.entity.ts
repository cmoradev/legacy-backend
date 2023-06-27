import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { CreditNoteSchool } from '../../../../credit-note-school/entities/credit-note-school.entity';
import { InvoiceType } from '../../../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { SchoolChargePayment } from '../../school-charges-payments/entities/school-charge-payment.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { InvoiceGlobalEnum } from '../../../../common/enums/InvoiceGlobal.enum';

@Entity('school_charges_invoice')
export class SchoolChargesInvoice extends Base {
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceGlobalEnum.IS_NOT_GLOBAL,
        enum: InvoiceGlobalEnum,
    })
    isGlobal: InvoiceGlobalEnum;

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

    @Column('tinyint', {
        nullable: false,
        default: () => '0',
        name: 'status',
    })
    status: number;

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
        type: 'simple-enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Column('int', {
        nullable: false,
        default: () => '0',
        name: 'id_plantel',
    })
    idPlantel: number;

    /**
     * Relación que corresponde al la factura al pago de una venta
     */
    @ManyToOne(() => SchoolChargePayment, (schoolChargePayment) => schoolChargePayment.schoolChargesInvoice)
    schoolChargePayment: SchoolChargePayment;

    @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesInvoice)
    schoolCharge: SchoolCharge;

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

    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeAcademyInvoice)
    @JoinColumn({
        name: 'invoiceBranchOfficeId',
        referencedColumnName: 'id',
    })
    invoiceBranchOffice: BranchOffice;

    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettAcademyInvoice)
    invoiceBranchOfficeSet: BranchOfficeSetting;

    @ManyToOne(() => CreditNoteSchool, (creditNoteSchool) => creditNoteSchool.invoiceSchool, { nullable: true })
    @JoinColumn({
        name: 'creditNotesSchoolId',
        referencedColumnName: 'id',
    })
    creditNotesSchool: CreditNoteSchool;
}
