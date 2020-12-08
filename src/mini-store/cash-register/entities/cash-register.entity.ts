import {
    Column,
    CreateDateColumn,
    Entity,
    Generated, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { CashRegisterTransaction } from '../../cash-register-transactions/entities/cash-register-transaction.entity';
import { User } from '../../../system/users/entities/user.entity';
import { DateTimeZoneTransformer } from '../../../common/orm/entities/transformers/date-time-zone.transformer';
import { MiniStoreTransaction } from '../../store-sales/mini-store-transaction/entities/mini-store-transaction.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { isDesktop } from '../../../common/desktop/desktop.config';

@Entity({ name: 'cash_register' })
export class CashRegister extends Base {

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({
        type: isDesktop ? 'date' : 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    openAt: Date;

    @Column({
        type: isDesktop ? 'date' : 'timestamp',
        nullable: true,
    })
    closedAt: Date | null;

    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
    })
    initialAmount: string;

    @Column('decimal', {
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
    })
    finalAmount: string;

    @ManyToOne(() => User, (user) => user.cashRegisterHistory, {
        nullable: false,
    })
    agent: User;

    @OneToMany(type => CashRegisterTransaction, cashRegisterTransaction => cashRegisterTransaction.cashRegister,
        {
            cascade: ['insert'],
        })
    transactions: CashRegisterTransaction[];

    @OneToMany(type => MiniStoreTransaction, (miniStoreTransaction) => miniStoreTransaction.cashRegister, {
        cascade: ['insert'],
    })
    movements: MiniStoreTransaction[];

}
