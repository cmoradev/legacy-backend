import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Group} from '../../groups/entities/group.entity';
import {Inscription} from '../../inscriptions/entities/inscription.entity';
import {Assignment} from '../../assignments/entities/assignment.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';

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

    @Column('timestamp', {
        nullable: false,
        name: 'fecha_inicio',
    })
    dateStart: Date;

    @Column('timestamp', {
        nullable: false,
        name: 'fecha_fin',
    })
    dateEnd: Date;

    @Column('tinyint', {
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

    @OneToMany(() => Group, (group) => group.groupCycle)
    groups: Group[];

    @OneToMany(() => Classroom, (classroom) => classroom.cycle)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripCycle)
    ciclyeInscriptions: Inscription[];
    @OneToMany(() => Assignment, (assignment) => assignment.cycle)
    assignments: Assignment[];
}
