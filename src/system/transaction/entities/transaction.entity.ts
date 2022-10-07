import { TypeTransaction } from '../../../common/enums/TypeTransaction.enum';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';

@Entity('transaction')
export class Transaction extends Base {

    @Column({
        type: 'simple-enum',
        enum: TypeTransaction,
        nullable: false,
    })
    type: TypeTransaction;

    @Column('int', {
        nullable: false,
    })
    preBalance: number;

    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Column('int', {
        nullable: false,
    })
    balance: number;

    @ManyToOne(() => Student, (student) => student.transactions, {
        cascade: ['insert', 'update'], nullable: false
    })
    student: Student;

    @ManyToOne(() => MiniStoreSale, (sale) => sale.transactions, {
        cascade: ['insert', 'update'], nullable: false
    })
    sale: MiniStoreSale;
}
