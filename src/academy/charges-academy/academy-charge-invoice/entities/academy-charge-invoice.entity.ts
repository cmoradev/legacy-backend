import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InvoiceType } from '../../../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { User } from '../../../../system/users/entities/user.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';
import { AcademyChargePayments } from '../../academy-charge-payments/entities/academy-charge-payments.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceStatus } from '../../../../invoice/types/invoice-status';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { CreditNoteAcademy } from '../../../../credit-note-academy/entities/credit-note-academy.entity';
import { InvoiceGlobalEnum } from '../../../../common/enums/InvoiceGlobal.enum';

@ObjectType()
@Entity('ac_facturas')
export class AcademyChargeInvoice extends Base {
    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceGlobalEnum.IS_NOT_GLOBAL,
        enum: InvoiceGlobalEnum,
    })
    isGlobal: InvoiceGlobalEnum;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        name: 'folio',
    })
    folio: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'uuid',
    })
    uuid: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 300,
        name: 'razon_social',
    })
    businessName: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'rfc',
    })
    rfc: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'total',
    })
    total: string | null;

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

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceType.income,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceStatus.Unbilled,
        enum: InvoiceStatus,
        name: 'status',
    })
    status: InvoiceStatus;

    @Field()
    @Column({
        nullable: true,
        name: 'motivo',
    })
    motivo: string | null;

    @Field()
    @Column({
        nullable: true,
        name: 'folioSustitucion',
    })
    folioSustitucion: string | null;

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

    @Field(type => AcademyChargePayments)
    @ManyToOne(() => AcademyChargePayments, (schoolChargePayment) => schoolChargePayment.academyChargesInvoice)
    academyChargePayment: AcademyChargePayments;

    @Field(type => AcademyCharge)
    @ManyToOne(() => AcademyCharge, (academyCharge) => academyCharge.chargesInvoice)
    @JoinColumn({
        name: 'id_ac_cobro',
        referencedColumnName: 'id',
    })
    academyCharge: AcademyCharge;

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

    @ManyToOne(() => CreditNoteAcademy, (creditNoteAcademy) => creditNoteAcademy.invoicesAcademy, { nullable: true })
    creditNoteAcademy: CreditNoteAcademy;
}
