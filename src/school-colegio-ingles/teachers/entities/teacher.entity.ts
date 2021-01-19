import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { User } from '../../../system/users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('teacher')
export class Teacher extends Base {

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    phone: string;

    @Field(type => [Assignment])
    @OneToMany(() => Assignment, (assignment) => assignment.teacher)
    assignments: Assignment[];

    @Field(type => User)
    @OneToOne(() => User, (user) => user.teacher, { cascade: ['update'] })
    @JoinColumn()
    user: User;

    @Field(type => [Incident])
    @OneToMany(() => Incident, (incident) => incident.teacher)
    incidents: Incident[];
}
