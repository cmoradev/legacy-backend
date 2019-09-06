import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Assignment} from '../../assignments/entities/assignment.entity';
import { User } from '../../users/entities/user.entity';
import { Incident } from '../../incidents/entities/incident.entity';

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

    @OneToMany(() => Assignment, (assignment) => assignment.teacher )
    assignments: Assignment[];

    @OneToOne(() => User, (user) => user.teacher)
    @JoinColumn()
    user: User;

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
    @OneToMany(() => Incident, (incident) => incident.teacher)
    incidents: Incident[];
}
