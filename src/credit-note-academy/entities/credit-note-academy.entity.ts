import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AcademyChargeInvoice } from "../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity";
import { DateTimeZoneTransformer } from "../../common/orm/entities/transformers/date-time-zone.transformer";
import { InvoiceStatus } from "../../invoice/types/invoice-status";
import { InvoiceType } from "../../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum";
import { BranchOffice } from "../../system/branch-office/entities/branch-office.entity";
import { User } from "../../system/users/entities/user.entity";

@ObjectType()
@Entity()
export class CreditNoteAcademy {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Field(() => GraphQLISODateTime)
    @CreateDateColumn({
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    @UpdateDateColumn({
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;


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
    })
    rfc: string | null;

    @Field(() => Int, { nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'total',
    })
    total: number | null;

    @Field()
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
        default: InvoiceType.expenses,
        enum: InvoiceType,
    })
    invoiceType: InvoiceType;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: InvoiceStatus.Unbilled,
        enum: InvoiceStatus,
    })
    status: InvoiceStatus;

    @Field(() => BranchOffice)
    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeStoreInvoice)
    invoiceBranchOffice: BranchOffice;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.miniStoreBillingInvoices)
    agentBilling: User;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.miniStoreCancelingInvoices)
    agentCanceling: User;

    @OneToMany(() => AcademyChargeInvoice, (academyInvoice) => academyInvoice.creditNoteAcademy)
    invoicesAcademy: AcademyChargeInvoice[];
}
