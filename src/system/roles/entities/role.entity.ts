import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Base } from '../../../common/orm/entities/base.entity';
@Entity('role')
export class Role extends Base {

    @Column('boolean', {
        nullable: false,
    })
    isActive: boolean;

    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

    @OneToMany(() => Permission, (permission) => permission.role)
    permissions: Permission[];

    @OneToMany(() => User, (user) => user.role )
    users: User[];
}
