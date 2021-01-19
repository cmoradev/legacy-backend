import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { BranchOffice } from '../../branch-office/entities/branch-office.entity';
import { TypeModule } from '../../../invoice/interface/FolioInvoice.interface';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { SchoolPayment } from '../../../school-colegio-ingles/school-payments/entities/school-payment.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SchoolCharge } from '../../../school-colegio-ingles/charges-school/school-charges/entities/school-charge.entity';
import { SchoolChargePayment } from '../../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { AcademyChargePayments } from '../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { MiniStoreInvoice } from '../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { AcademyChargeInvoice } from '../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('facturacion_empresas')
export class BranchOfficeSetting extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'nombre',
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'rfc',
    })
    rfc: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 300,
        name: 'razon_social',
    })
    businessName: string;

    @Field()
    @Column('text', {
        nullable: false,
        name: 'direccion',
    })
    address: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'regimen',
    })
    regime: number;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 5,
        name: 'regimen_fiscal',
    })
    fiscalRegime: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_postal',
    })
    zip: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'pais',
    })
    country: number;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'foliaje_nota',
    })
    foliajeNota: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'foliaje_factura',
    })
    foliajeFactura: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'foliaje_pago',
    })
    foliajePago: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        name: 'folio_cotizacion',
    })
    folioCotizacion: number;

    @Field(type => Int ,{  nullable: true })
    @Column('int', {
        nullable: true,
        name: 'serie_cotizacion',
    })
    serieCotizacion: number;

    @Field({ nullable: true })
    @Column('int', {
        nullable: true,
        name: 'serie_nota',
    })
    serieNota: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'serie_factura',
    })
    serieFactura: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'serie_pago',
    })
    seriePago: number;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 5,
        name: 'serie_facturacion',
    })
    serieFacturacion: string;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        width: 2,
    })
    daysQuoteValid: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: true,
        default: () => '\'0.00\'',
        precision: 15,
        scale: 2,
        name: 'per_commissions',
    })
    perCommissions; // porcentaje de la comision

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'cer_csd',
    })
    cerCSD: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'key_csd',
    })
    keyCSD: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'password',
    })
    password: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'correo',
    })
    email: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'cuenta_bancaria',
    })
    bankAccount: string;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        name: 'id_modalidad',
        enum: TypeModule,
        default: 3,
    })
    typeModule: TypeModule;

    @Field(type => Int, { nullable: false })
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: boolean;

    @Field(type => Int, { nullable: false })
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
    })
    isQuickSale: boolean;

    @Field(type => InvoiceMethodPayment)
    @ManyToOne(type => InvoiceMethodPayment, mP => mP.methodPayBranchOffSet)
    quickSaleMethod: InvoiceMethodPayment;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.branchoffice)
    invoiceCampus: BranchOffice;

    @Field(type => [MiniStoreSale])
    @OneToMany(() => MiniStoreSale, (sale) => sale.storeBranchOfficeSet)
    branchOfficeSetStore: MiniStoreSale[];

    @Field(type => [MiniStoreSalePayment])
    @OneToMany(() => MiniStoreSalePayment, (payments) => payments.storePaymentOffice)
    branchOfficeSettStorePayment: MiniStoreSalePayment[];

    @Field(type => [MiniStoreInvoice])
    @OneToMany(() => MiniStoreInvoice, (payments) => payments.invoiceBranchOfficeSet)
    branchOfficeSettStoreInvoice: MiniStoreInvoice[];

    @Field(type => [SchoolCharge])
    @OneToMany(() => SchoolCharge, (sale) => sale.schoolBranchOfficeSet)
    branchOfficeSetSchool: SchoolCharge[];

    @Field(type => [SchoolChargePayment])
    @OneToMany(() => SchoolChargePayment, (payments) => payments.schoolPaymentOfficeSet)
    branchOfficeSettSchoolPayment: SchoolChargePayment[];

    @Field(type => [AcademyCharge])
    @OneToMany(() => AcademyCharge, (sale) => sale.academyBranchOfficeSet)
    branchOfficeSetAcademy: AcademyCharge[];

    @Field(type => [AcademyChargePayments])
    @OneToMany(() => AcademyChargePayments, (payments) => payments.academyPaymentOfficeSet)
    branchOfficeSettAcademyPayment: AcademyChargePayments[];

    @Field(type => [AcademyChargeInvoice])
    @OneToMany(() => AcademyChargeInvoice, (payments) => payments.invoiceBranchOfficeSet)
    branchOfficeSettAcademyInvoice: AcademyChargeInvoice[];
}
