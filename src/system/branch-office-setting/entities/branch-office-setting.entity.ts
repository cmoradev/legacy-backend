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

@Entity('facturacion_empresas')
export class BranchOfficeSetting extends Base {

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'rfc',
    })
    rfc: string;

    @Column('varchar', {
        nullable: false,
        length: 300,
        name: 'razon_social',
    })
    businessName: string;

    @Column('text', {
        nullable: false,
        name: 'direccion',
    })
    address: string;

    @Column('int', {
        nullable: false,
        name: 'regimen',
    })
    regime: number;

    @Column('varchar', {
        nullable: false,
        length: 5,
        name: 'regimen_fiscal',
    })
    fiscalRegime: string;

    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_postal',
    })
    zip: string;

    @Column('int', {
        nullable: false,
        name: 'pais',
    })
    country: number;

    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'foliaje_nota',
    })
    foliajeNota: string | null;

    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'foliaje_factura',
    })
    foliajeFactura: string;

    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'foliaje_pago',
    })
    foliajePago: string;

    @Column('varchar', {
        nullable: true,
        name: 'folio_cotizacion',
    })
    folioCotizacion: number;

    @Column('int', {
        nullable: true,
        name: 'serie_cotizacion',
    })
    serieCotizacion: number;

    @Column('int', {
        nullable: true,
        name: 'serie_nota',
    })
    serieNota: number;

    @Column('int', {
        nullable: true,
        name: 'serie_factura',
    })
    serieFactura: number;

    @Column('int', {
        nullable: true,
        name: 'serie_pago',
    })
    seriePago: number;

    @Column('varchar', {
        nullable: false,
        length: 5,
        name: 'serie_facturacion',
    })
    serieFacturacion: string;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'cer_csd',
    })
    cerCSD: string;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'key_csd',
    })
    keyCSD: string;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'password',
    })
    password: string;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'correo',
    })
    email: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'cuenta_bancaria',
    })
    bankAccount: string;

    @Column({
        type: 'enum',
        nullable: false,
        name: 'id_modalidad',
        enum: TypeModule,
        default: 3,
    })
    typeModule: TypeModule;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: boolean;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
    })
    isQuickSale: boolean;

    @ManyToOne(type => InvoiceMethodPayment, mP => mP.methodPayBranchOffSet)
    quickSaleMethod: InvoiceMethodPayment;

    @ManyToOne(() => BranchOffice, (campus) => campus.branchoffice)
    invoiceCampus: BranchOffice;

    @OneToMany(() => MiniStoreSale, (sale) => sale.storeBranchOfficeSet)
    branchOfficeSetStore: MiniStoreSale[];

    @OneToMany(() => MiniStoreSalePayment, (payments) => payments.storePaymentOffice)
    branchOfficeSettStorePayment: MiniStoreSalePayment[];

    @OneToMany(() => MiniStoreInvoice, (payments) => payments.invoiceBranchOfficeSet)
    branchOfficeSettStoreInvoice: MiniStoreInvoice[];

    @OneToMany(() => SchoolCharge, (sale) => sale.schoolBranchOfficeSet)
    branchOfficeSetSchool: SchoolCharge[];

    @OneToMany(() => SchoolChargePayment, (payments) => payments.schoolPaymentOfficeSet)
    branchOfficeSettSchoolPayment: SchoolChargePayment[];

    @OneToMany(() => AcademyCharge, (sale) => sale.academyBranchOfficeSet)
    branchOfficeSetAcademy: AcademyCharge[];

    @OneToMany(() => AcademyChargePayments, (payments) => payments.academyPaymentOfficeSet)
    branchOfficeSettAcademyPayment: AcademyChargePayments[];

    @OneToMany(() => AcademyChargeInvoice, (payments) => payments.invoiceBranchOfficeSet)
    branchOfficeSettAcademyInvoice: AcademyChargeInvoice[];
}
