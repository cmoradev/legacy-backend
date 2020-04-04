import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { TransactionType } from '../types/Transaction.enum';

@Entity('tie_transaction')
export class MiniStoreTransaction extends Base {

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

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'applicationDate',
    })
    applicationDate: Date;

    @Column({
        type: 'enum',
        nullable: false,
        default: TransactionType.income,
        enum: TransactionType,
    })
    transactionType: TransactionType;

    @ManyToOne(() => User, (user) => user.miniStoreTransaction)
    transactionUser: User;
}
