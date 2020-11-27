import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from '../../routes/entities/route.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity()
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

    @Column('varchar', {
        nullable: true,
        length: 60,
    })
    icon: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
    })
    isDefault: string;

    @ManyToMany(() => Route, (route) => route.actions, {
        cascade: ['insert', 'update'],
    })
    routes: Route[];

    @ManyToMany(() => Permission, (permission) => permission.actions, {
        cascade: ['insert', 'update'],
    })
    permission: Permission[];
}
