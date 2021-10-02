import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { InvoiceType } from '../../../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { SchoolChargePayment } from '../../school-charges-payments/entities/school-charge-payment.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreditNoteSchool } from '../../../../credit-note-school/entities/credit-note-school.entity';

@ObjectType()
@Entity('school_charges_invoice')
export class SchoolChargesInvoice extends Base {

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    folio: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: false,
        length: 100,
    })
    uuid: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 300,
    })
    businessName: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 20,
    })
    rfc: string | null;

    @Field(type => Int, { nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    total: number | null;

    @Field({ nullable: true })
    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'fecha_cancelacion',
    })
    cancellationDate: Date | null;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
        name: 'motivo_cancelacion',
    })
    reasonCancellation: string | null;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        default: () => '0',
        name: 'status',
    })
    status: number;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '0',
        name: 'id_plantel',
    })
    idPlantel: number;

    /**
     * Relación que corresponde al la factura al pago de una venta
     */
    @Field(type => SchoolChargePayment)
    @ManyToOne(() => SchoolChargePayment, (schoolChargePayment) => schoolChargePayment.schoolChargesInvoice)
    schoolChargePayment: SchoolChargePayment;

    @Field(type => SchoolCharge)
    @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesInvoice)
    schoolCharge: SchoolCharge;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.schoolChargesBillingInvoices)
    @JoinColumn({
        name: 'id_agente_facturador',
        referencedColumnName: 'id',
    })
    agentBilling: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.schoolChargesCancelingInvoices)
    @JoinColumn({
        name: 'id_agente_cancelador',
        referencedColumnName: 'id',
    })
    agentCanceling: User;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeAcademyInvoice)
    @JoinColumn({
        name: 'invoiceBranchOfficeId',
        referencedColumnName: 'id',
    })
    invoiceBranchOffice: BranchOffice;

    @Field(type => BranchOfficeSetting)
    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettAcademyInvoice)
    invoiceBranchOfficeSet: BranchOfficeSetting;

    @OneToMany(() => CreditNoteSchool, (creditNoteSchool) => creditNoteSchool.invoiceSchool)
    creditNotesSchool: CreditNoteSchool[];
}
