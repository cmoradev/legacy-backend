import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('role')
export class Role extends Base {

    @Field()
    @Column('boolean', {
        nullable: false,
    })
    isActive: boolean;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @Field(type => [Permission])
    @OneToMany(() => Permission, (permission) => permission.role)
    permissions: Permission[];

    @Field(type => [User])
    @OneToMany(() => User, (user) => user.role )
    users: User[];
}
