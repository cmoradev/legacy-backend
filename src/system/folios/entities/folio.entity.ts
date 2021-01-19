import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'folios' })
export class Folio extends Base {

    @Field(type => Int)
    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    salesFolio: number;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    salesPrefix: string;

    @Field(type => Int)
    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    paymentsFolio: number;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    paymentsPrefix: string;

    @Field(type => Int)
    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    quotationsFolio: number;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    quotationsPrefix: string;

    @Field(type => Int)
    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
    invoicesFolio: number;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: 'XXXXXX-',
    })
    invoicesPrefix: string;
}
