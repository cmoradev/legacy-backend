import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { RouteAction } from '../../route-action/entities/route-action.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('route')
export class Route extends Base {

    @Column('tinyint', {
        nullable: false,
    })
    isActive: number;

    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @Column('int', {
        nullable: true,
    })
    fatherID: number;

    @Column('int', {
        nullable: false,
    })
    level: number;

    @Column('varchar', {
        nullable: true,
    })
    url: string | null;

    @Column('text', {
        nullable: false,
    })
    icon: string;

    @OneToMany(() => Permission, (permission) => permission.route)
    permissions: Permission[];

    @OneToMany(type => RouteAction, routeAction => routeAction.route)
    routeActions: RouteAction[];

    @Column('varchar', {
        nullable: true,
        length: 255,
        default: '',
    })
    mpath: string;
}
