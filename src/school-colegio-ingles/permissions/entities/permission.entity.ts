import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Route } from '../../routes/entities/route.entity';

@Entity()
@Tree('closure-table')
export class Permission {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column('boolean', {
        nullable: false,
    })
    isActive: boolean;

    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @Column('boolean', {
        nullable: false,
    })
    isFather: boolean;

    @Column('int', {
        nullable: false,
    })
    level: number;

    @Column('varchar', {
        nullable: true,
    })
    url: string | null;

    @Column('varchar', {
        nullable: false,
        length: 50,
    })
    icon: string;

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

    @TreeChildren()
    children: Permission[];

    @TreeParent()
    parent: Permission;
}
