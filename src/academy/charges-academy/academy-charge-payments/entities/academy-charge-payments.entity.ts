import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';
import { AcademyChargeMethodsPayments } from '../../academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { AcademyChargeInvoice } from '../../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { BranchOffice } from '../../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_charge_payments')
export class AcademyChargePayments extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        default: '000000000000000',
        name: 'folio',
    })
    folio: string;

    @Field({ nullable: true})
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    change: number | null;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Field({ nullable: true})
    @Column( {
        type: 'timestamp',
        nullable: true,
    })
    dateCancellation: Date | null;

    @Field({ nullable: true})
    @Column('text', {
        nullable: true,
    })
    reasonCancellation: string | null;

    @Field({ nullable: true})
    @Column('text', {
        nullable: true,
    })
    observations: string | null;

    /**
     * Timbrado
     */
    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '0',
    })
    stamping: number;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '1',
    })
    isIVA: boolean;

    @Field(type => AcademyCharge)
    @ManyToOne(() => AcademyCharge, (academyCharge) => academyCharge.chargesPayments)
    academyCharge: AcademyCharge;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branch) => branch.branchOfficeAcademyPayment)
    academyPaymentOffice: BranchOffice;

    @Field(type => BranchOfficeSetting)
    @ManyToOne(() => BranchOfficeSetting, (branchSet) => branchSet.branchOfficeSettAcademyPayment)
    academyPaymentOfficeSet: BranchOfficeSetting;

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

    @Field(type => [AcademyChargeMethodsPayments])
    @OneToMany(() => AcademyChargeMethodsPayments, (chargesMethodsPayments) => chargesMethodsPayments.academyChargePayment, {
        cascade: ['insert'],
    })
    methodsPayments: AcademyChargeMethodsPayments[];

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.academyChargesPayments)
    cashierCharge: User;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.chargesPaymentsCancellation)
    cashierChargeCancellation: User;
    /*
     * Relación Bidireccional del pago de una venta con la Facturas
    */
    @Field(type => [AcademyChargeInvoice])
    @OneToMany(() => AcademyChargeInvoice, (acChargesInvoice) => acChargesInvoice.academyChargePayment)
    academyChargesInvoice: AcademyChargeInvoice[];
}
