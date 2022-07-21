import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { RouteAction } from '../../route-action/entities/route-action.entity';

@Entity('action')
export class Action extends Base {

    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @Column('varchar', {
        nullable: true,
    })
    description: string;

    @Column('text', {
        nullable: true
    })
    icon: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
    })
    isDefault: boolean;

    @OneToMany(type => RouteAction, routeAction => routeAction.action)
    routeActions: RouteAction[];

    @ManyToMany(() => Permission, (permission) => permission.actions, {
        cascade: ['insert', 'update'],
    })
    permission: Permission[];
}
