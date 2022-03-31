import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { SchoolChargesMethodsPayments } from '../../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { SchoolChargesInvoice } from '../../school-charges-invoice/entities/school-charges-invoice.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('school_charge_payments')
export class SchoolChargePayment extends Base {
    @Field()
    @Column('varchar', {nullable: true})
    globalUuid: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        default: '000000000000000',
        name: 'folio',
    })
    folio: string;

    @Field(type => Int, {nullable: true})
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    change: number | null;

    @Field(type => Int, {nullable: true})
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Field({nullable: true})
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    dateCancellation: Date | null;

    @Field({nullable: true})
    @Column('text', {
        nullable: true,
    })
    reasonCancellation: string | null;

    @Field({nullable: true})
    @Column('text', {
        nullable: true,
    })
    observations: string | null;

    /**
     * Timbrado
     */
    @Field(type => Int, {nullable: false})
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '0',
    })
    stamping: number;

    @Field(type => Int, {nullable: false})
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '1',
    })
    isIVA: boolean;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeSchoolPayment)
    schoolPaymentOffice: BranchOffice;

    @Field(type => BranchOfficeSetting)
    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettSchoolPayment)
    schoolPaymentOfficeSet: BranchOfficeSetting;

    @Field(type => SchoolCharge)
    @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesPayments)
    schoolCharge: SchoolCharge;

    @Field()
    @Column({
        type: 'simple-enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'paymentStatusId',
    })
    paymentStatus: PaymentStatus;

    /**
     * Relación de un pago con sus metodos de pago
     */
    @Field(type => [SchoolChargesMethodsPayments])
    @OneToMany(() => SchoolChargesMethodsPayments, (chargesMethodsPayments) => chargesMethodsPayments.schoolChargePayment, {
        cascade: ['insert'],
    })
    methodsPayments: SchoolChargesMethodsPayments[];

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.schoolChargesPayments)
    cashierCharge: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.chargesPaymentsCancellation)
    cashierChargeCancellation: User;
    /*
     * Relación Bidireccional del pago de una venta con la Facturas
    */
    @Field(type => [SchoolChargesInvoice])
    @OneToMany(() => SchoolChargesInvoice, (schoolChargesInvoice) => schoolChargesInvoice.schoolChargePayment, {
        cascade: ['insert'],
    })
    schoolChargesInvoice: SchoolChargesInvoice[];
}
