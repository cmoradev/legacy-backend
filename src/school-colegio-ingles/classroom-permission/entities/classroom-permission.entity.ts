import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ClassroomPermission {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ManyToOne(() => Classroom, (classroom) => classroom.classroomPermissions)
    classroom: Classroom;

    @ManyToOne(() => User, (user) => user.classroomPermissions)
    user: User;

    @Column('tinyint', {
        nullable: false,
        default: () => '\'1\'',
    })
    isActive: boolean;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;
}
