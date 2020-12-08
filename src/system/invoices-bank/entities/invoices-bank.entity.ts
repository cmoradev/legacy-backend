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
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';

import { SchoolChargesMethodsPayments } from '../../../school-colegio-ingles/charges-school/school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('facturacion_bancos')
export class InvoicesBank extends Base {

    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'nombre',
    })
    name: string;

    @OneToMany(() => MiniStoreSaleMethodPayment, (SalesMethodPayment) => SalesMethodPayment.Bank)
    SalesMethodPayment: MiniStoreSaleMethodPayment[];

    @OneToMany(() => SchoolChargesMethodsPayments, (ChargesMethodsPayments) => ChargesMethodsPayments.Bank)
    schoolChargesMethodsPayments: SchoolChargesMethodsPayments[];
}
