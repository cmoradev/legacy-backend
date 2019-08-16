import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Route } from '../../routes/entities/route.entity';

@Entity()
export class Action {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 60,
    })
    name: string;

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

    @ManyToMany(() => Route, (route) => route.actions)
    routes: Route[];
}
