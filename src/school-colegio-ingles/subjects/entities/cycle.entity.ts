import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Group} from './group.entity';
import {Student} from './student.entity';
import {Inscription} from './inscription.entity';
import {Assignment} from './assignment.entity';

@Entity('ciclos')
export class Cycle {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'ciclo',
    })
    name: string;

    @Column('date', {
        nullable: false,
        name: 'fecha_inicio',
    })
    dateStart: string;

    @Column('date', {
        nullable: false,
        name: 'fecha_fin',
    })
    dateEnd: string;

    @Column('int', {
        nullable: false,
        name: 'active',
    })
    isActive: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @OneToMany(() => Group, (group) => group.cycle)
    groups: Group[];

    @OneToMany(() => Inscription, (inscription) => inscription.cycle)
    inscriptions: Inscription[];
    @OneToMany(() => Assignment, (assignment) => assignment.cycle)
    assignments: Assignment[];
}
