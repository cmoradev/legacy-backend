import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable} from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { Action } from '../../actions/entities/action.entity';

@Entity()
export class Route {
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

    @OneToMany(() => Permission, (permission) => permission.route)
    permissions: Permission[];

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

    @ManyToMany(() => Action, (action) => action.routes)
    @JoinTable()
    actions: Action[];
}
