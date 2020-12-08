import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { CashRegister } from '../../../cash-register/entities/cash-register.entity';
import { CashRegisterTransactionType } from '../../../cash-register-transactions/enums/cash-register-transaction-type.enum';
import { isDesktop } from '../../../../common/desktop/desktop.config';

@Entity('tie_transaction')
export class MiniStoreTransaction extends Base {

    @Column('varchar', {
        nullable: false,
        length: 40,
        default: () => '\'000000000000000\'',
        name: 'folio',
    })
    folio: string;

    @Column('text', {
        nullable: true,
    })
    reasonTransaction: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
    })
    quantity: number;

    @Column('text', {
        nullable: true,
        name: 'description',
    })
    description: string | null;

    @Column({
        type: isDesktop ? 'date' : 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'applicationDate',
    })
    applicationDate: Date;

    @Column({
        type: 'simple-enum',
        nullable: false,
        default: CashRegisterTransactionType.income,
        enum: CashRegisterTransactionType,
    })
    transactionType: CashRegisterTransactionType;

    @ManyToOne(() => User, (user) => user.miniStoreTransaction)
    transactionUser: User;

    @ManyToOne(type => CashRegister, (cashRegister) => cashRegister.movements)
    cashRegister: CashRegister;
}
