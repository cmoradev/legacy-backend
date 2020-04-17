import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { StatusPayment } from '../../../../common/enums/statusPayment';

@Entity('ac_charge_payments')
export class AcademyChargePayments extends Base {

    @Column('varchar', {
        nullable: false,
        length: 45,
        default: '000000000000000',
        name: 'folio',
    })
    folio: string;

    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    change: number | null;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Column('timestamp', {
        nullable: true,
    })
    dateCancellation: Date | null;

    @Column('text', {
        nullable: true,
    })
    reasonCancellation: string | null;

    @Column('text', {
        nullable: true,
    })
    observations: string | null;

    /**
     * Timbrado
     */
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '0',
    })
    stamping: number;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '1',
    })
    isIVA: boolean;
    /*
        @ManyToOne(() => SchoolCharge, (schoolCharge) => schoolCharge.chargesPayments)
        schoolCharge: SchoolCharge;*/

    @Column({
        type: 'enum',
        enum: StatusPayment,
        default: StatusPayment.Debit,
        nullable: false,
        name: 'paymentStatusId',
    })
    paymentStatus: StatusPayment;

    /**
     * Relación de un pago con sus metodos de pago
     */
    /*
    @OneToMany(() => SchoolChargesMethodsPayments, (chargesMethodsPayments) => chargesMethodsPayments.schoolChargePayment, {
        cascade: ['insert'],
    })
    methodsPayments: SchoolChargesMethodsPayments[];*/

    @ManyToOne(() => User, (user) => user.schoolChargesPayments)
    cashierCharge: User;

    @ManyToOne(() => User, (user) => user.chargesPaymentsCancellation)
    cashierChargeCancellation: User;
    /*
     * Relación Bidireccional del pago de una venta con la Facturas
    */
    /*
    @OneToMany(() => SchoolChargesInvoice, (schoolChargesInvoice) => schoolChargesInvoice.schoolChargePayment)
    schoolChargesInvoice: SchoolChargesInvoice[];*/
}
