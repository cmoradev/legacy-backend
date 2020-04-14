import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity({ name: 'folios' })
export class Folio extends Base {
    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    salesFolio: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    salesPrefix: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    paymentsFolio: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    paymentsPrefix: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    quotationsFolio: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    quotationsPrefix: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    invoicesFolio: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    invoicesPrefix: string;
}
