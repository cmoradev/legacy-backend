import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSalePayment } from '../../store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { CashRegister } from '../../cash-register/entities/cash-register.entity';
import { CashRegisterTransactionType } from '../enums/cash-register-transaction-type.enum';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity({ name: 'cash_register_transactions' })
export class CashRegisterTransaction extends Base {

    @Column({
        type: 'simple-enum',
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

}
