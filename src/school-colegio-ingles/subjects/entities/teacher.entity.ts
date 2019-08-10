import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Assignment} from '../../assignments/entities/assignment.entity';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(type => Assignment, (assignment) => assignment.teacher )
    assignments: Assignment[];

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
