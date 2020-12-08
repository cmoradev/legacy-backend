import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { User } from '../../../system/users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class ClassroomPermission extends Base {


    @ManyToOne(() => Classroom, (classroom) => classroom.classroomPermissions)
    classroom: Classroom;

    @ManyToOne(() => User, (user) => user.classroomPermissions)
    user: User;

    @Column('tinyint', {
        nullable: false,
        default: () => '\'1\'',
    })
    isActive: boolean;
}
