import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { RouteAction } from '../../route-action/entities/route-action.entity';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('action')
export class Action extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
    })
    description: string;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true
    })
    icon: string;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
    })
    isDefault: boolean;

    @Field(type => [RouteAction])
    @OneToMany(type => RouteAction, routeAction => routeAction.action)
    routeActions: RouteAction[];

    @Field(type => [Permission])
    @ManyToMany(() => Permission, (permission) => permission.actions, {
        cascade: ['insert', 'update'],
    })
    permission: Permission[];
}
