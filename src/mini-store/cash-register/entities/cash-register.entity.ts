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

@Entity({ name: 'cash_register' })
export class CashRegister {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        transformer: new DateTimeZoneTransformer(),
    })
    openAt: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    closedAt: Date;

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
    createdDate: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    updatedDate: Date;
}
