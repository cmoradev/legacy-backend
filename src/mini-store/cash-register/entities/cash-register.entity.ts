import { Column, Entity, Generated, ManyToOne, OneToMany } from 'typeorm';
import { CashRegisterTransaction } from '../../cash-register-transactions/entities/cash-register-transaction.entity';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreTransaction } from '../../store-sales/mini-store-transaction/entities/mini-store-transaction.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'cash_register' })
export class CashRegister extends Base {

    @Field()
    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    openAt: Date;

    @Field({ nullable: true })
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    closedAt: Date | null;

    @Field()
    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
    })
    initialAmount: string;

    @Field()
    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
    })
    finalAmount: string;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.cashRegisterHistory, {
        nullable: false,
    })
    agent: User;

    @Field(type => [CashRegisterTransaction])
    @OneToMany(type => CashRegisterTransaction, cashRegisterTransaction => cashRegisterTransaction.cashRegister,
        {
            cascade: ['insert'],
        })
    transactions: CashRegisterTransaction[];

    @Field(type => [MiniStoreTransaction])
    @OneToMany(type => MiniStoreTransaction, (miniStoreTransaction) => miniStoreTransaction.cashRegister, {
        cascade: ['insert'],
    })
    movements: MiniStoreTransaction[];

}
