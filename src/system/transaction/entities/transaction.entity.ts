import { TypeTransaction } from 'src/common/enums/TypeTransaction.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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
}
