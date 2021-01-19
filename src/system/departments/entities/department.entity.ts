import { Column, Entity, OneToMany } from 'typeorm';
import { CheckIn } from '../../../school-colegio-ingles/check-in/entities/check-in.entity';
import { JobPosition } from '../../../fixed-assets-control/job-positions/entities/job-position.entity';
import { Location } from '../../../fixed-assets-control/locations/entities/location.entity';
import { User } from '../../users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('departamentos')
export class Department extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Field({  nullable: true })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Field(type => CheckIn)
    @OneToMany(() => CheckIn, (checkin) => checkin.department)
    inputRecords: CheckIn;

    @Field(type => [User])
    @OneToMany(() => User, (user) => user.department)
    users: User[];

    @Field(type => [JobPosition])
    @OneToMany(type => JobPosition, jobPosition => jobPosition.department)
    jobPositions: JobPosition[];

    @Field(type => [Location])
    @OneToMany(type => Location, location => location.department)
    locations: Location[];
}
