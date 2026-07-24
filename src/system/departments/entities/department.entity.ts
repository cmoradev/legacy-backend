import { Column, Entity, OneToMany } from 'typeorm';
import { JobPosition } from '../../../fixed-assets-control/job-positions/entities/job-position.entity';
import { Location } from '../../../fixed-assets-control/locations/entities/location.entity';
import { User } from '../../users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('departamentos')
export class Department extends Base {

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

    @OneToMany(() => User, (user) => user.department)
    users: User[];

    @OneToMany(type => JobPosition, jobPosition => jobPosition.department)
    jobPositions: JobPosition[];

    @OneToMany(type => Location, location => location.department)
    locations: Location[];
}
