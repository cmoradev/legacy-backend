import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { RouteAction } from '../../route-action/entities/route-action.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('route')
export class Route extends Base {

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
    })
    isActive: number;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
    })
    fatherID: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
    })
    level: number;

    @Field()
    @Column('varchar', {
        nullable: true,
    })
    url: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 50,
    })
    icon: string;

    @Field(type => [Permission])
    @OneToMany(() => Permission, (permission) => permission.route)
    permissions: Permission[];

    @Field(type => [RouteAction])
    @OneToMany(type => RouteAction, routeAction => routeAction.route)
    routeActions: RouteAction[];

    @Field()
    @Column('varchar', {
        nullable: true,
        length: 255,
        default: '',
    })
    mpath: string;
}
