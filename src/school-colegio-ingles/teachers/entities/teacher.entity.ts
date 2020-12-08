import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { User } from '../../../system/users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('teacher')
export class Teacher extends Base {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Assignment, (assignment) => assignment.teacher)
    assignments: Assignment[];

    @OneToOne(() => User, (user) => user.teacher, { cascade: ['update'] })
    @JoinColumn()
    user: User;

    @OneToMany(() => Incident, (incident) => incident.teacher)
    incidents: Incident[];
}
