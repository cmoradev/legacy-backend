import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Route } from '../../routes/entities/route.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Action } from '../../actions/entities/action.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('permission')
export class Permission extends Base {

    @Field(type => Int, { nullable: true })
    @Column('int', { nullable: true })
    routeId: number;

    @Field(type => Role)
    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role;

    @Field(type => Route)
    @ManyToOne(() => Route, (route) => route.permissions)
    route: Route;

    @Field(type => [Action])
    @ManyToMany(() => Action, (action) => action.permission, {
        cascade: ['insert', 'update', 'remove'],
    })
    @JoinTable()
    actions: Action[];

}
