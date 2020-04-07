import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSalePayment } from '../../store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { CashRegister } from '../../cash-register/entities/cash-register.entity';
import { CashRegisterTransactionType } from '../enums/cash-register-transaction-type.enum';
import { DateTimeZoneTransformer } from '../../../common/orm/entities/transformers/date-time-zone.transformer';

@Entity({ name: 'cash_register_transactions' })
export class CashRegisterTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({
        type: 'enum',
        nullable: false,
        default: CashRegisterTransactionType.income,
        enum: CashRegisterTransactionType,
    })
    transactionType: CashRegisterTransactionType;

    @ManyToOne(() => User, (user) => user.cashRegisterTransactions, {
        nullable: false,
    })
    agent: User;

    @ManyToOne(() => MiniStoreSalePayment, (payment) => payment.cashRegisterTransactions)
    payment: MiniStoreSalePayment;

    @ManyToOne(type => CashRegister, (cashRegister) => cashRegister.transactions)
    cashRegister: CashRegister;

    @VersionColumn({
        default: 0,
        nullable: false,
    })
    version: number;

    @CreateDateColumn({
        name: 'createdAt',
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    updatedAt: Date;
}
