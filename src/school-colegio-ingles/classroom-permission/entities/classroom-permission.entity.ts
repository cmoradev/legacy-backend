import { Column, Entity, ManyToOne } from 'typeorm';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { User } from '../../../system/users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ClassroomPermission extends Base {


    @Field(type => Classroom)
    @ManyToOne(() => Classroom, (classroom) => classroom.classroomPermissions)
    classroom: Classroom;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.classroomPermissions)
    user: User;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        default: () => '\'1\'',
    })
    isActive: boolean;
}
