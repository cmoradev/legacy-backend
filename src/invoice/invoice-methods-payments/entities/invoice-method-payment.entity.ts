import { Column, Entity, OneToMany } from 'typeorm';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('facturacion_formas_pago')
export class InvoiceMethodPayment extends Base {

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'nombre',
    })
    name: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'showReport',
    })
    showReport: number;

    @Column('varchar', {
        nullable: false,
        length: 3,
        name: 'codigo',
    })
    code: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'isActive',
    })
    isActive: number;

    @OneToMany(() => MiniStoreSaleMethodPayment, (miniStoreSaleMethodPayment) => miniStoreSaleMethodPayment.invoiceMethodPayment)
    miniStoreSaleMethodPayments: MiniStoreSaleMethodPayment[];

    @OneToMany(type => MiniStoreSaleMethodPayment, salePaymentMethod => salePaymentMethod.invoiceMethodPayment)
    salesPaymentMethods: MiniStoreSaleMethodPayment[];

    @OneToMany(type => MiniStoreSaleMethodPayment, salePaymentMethod => salePaymentMethod.invoiceMethodPayment)
    schoolChargePaymentMethods: MiniStoreSaleMethodPayment[];

    @OneToMany(type => BranchOfficeSetting, bOS => bOS.quickSaleMethod)
    methodPayBranchOffSet: BranchOfficeSetting[];
}
