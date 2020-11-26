import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Route } from '../../routes/entities/route.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Action } from '../../actions/entities/action.entity';

@Entity('permission')
export class Permission extends Base {

    @Column('int', { nullable: true })
    routeId: number;

    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role;

    @ManyToOne(() => Route, (route) => route.permissions)
    route: Route;

    @ManyToMany(() => Action, (action) => action.permission, {
        cascade: ['insert', 'update'],
    })
    @JoinTable()
    actions: Action[];

}
