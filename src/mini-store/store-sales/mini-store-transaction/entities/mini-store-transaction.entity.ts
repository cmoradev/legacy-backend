import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { CashRegister } from '../../../cash-register/entities/cash-register.entity';
import { CashRegisterTransactionType } from '../../../cash-register-transactions/enums/cash-register-transaction-type.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('tie_transaction')
export class MiniStoreTransaction extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 40,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
    })
    reasonTransaction: string | null;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Field(type => Int, { nullable: true })
    @Column('text', {
        nullable: true,
        name: 'description',
    })
    description: string | null;

    @Field({ nullable: false })
    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'applicationDate',
    })
    applicationDate: Date;

    @Field(type => CashRegisterTransactionType)
    @Column({
        type: 'simple-enum',
        nullable: false,
        default: CashRegisterTransactionType.income,
        enum: CashRegisterTransactionType,
    })
    transactionType: CashRegisterTransactionType;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.miniStoreTransaction)
    transactionUser: User;

    @Field(type => CashRegister)
    @ManyToOne(type => CashRegister, (cashRegister) => cashRegister.movements)
    cashRegister: CashRegister;
}
