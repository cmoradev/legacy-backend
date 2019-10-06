import {
    Column,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckIn } from '../../check-in/entities/check-in.entity';
import { User } from '../../users/entities/user.entity';
import { JobPosition } from '../../../fixed-assets-control/job-positions/entities/job-position.entity';

@Entity('departamentos')
export class Department {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

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

    @OneToMany(() => CheckIn, (checkin) => checkin.department)
    inputRecords: CheckIn;

    @OneToMany(() => User, (user) => user.department)
    users: User[];

    @OneToMany(type => JobPosition, jobPosition => jobPosition.department)
    jobPositions: JobPosition[];
}
