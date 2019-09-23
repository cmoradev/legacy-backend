import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Route } from '../../routes/entities/route.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column('int', { nullable: true })
    routeId: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role;

    @ManyToOne(() => Route, (route) => route.permissions )
    route: Route;

}
