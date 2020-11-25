import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from '../../../system/routes/entities/route.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Permission } from '../../../system/permissions/entities/permission.entity';

@Entity()
export class Action extends Base {

    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;
    
    @ManyToMany(() => Route, (route) => route.actions, {
        cascade: ['insert', 'update'],
    })
    routes: Route[];

    @ManyToMany(() => Permission, (permission) => permission.actions, {
        cascade: ['insert', 'update'],
    })
    permission: Permission[];
}
