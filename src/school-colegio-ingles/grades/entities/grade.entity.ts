import { Column, Entity,  ManyToOne, OneToMany,  PrimaryGeneratedColumn } from 'typeorm';
import {Level} from '../../levels/entities/level.entity';
import {Group} from '../../subjects/entities/group.entity';
import {Inscription} from '../../subjects/entities/inscription.entity';
import {AssignmentSubject} from '../../subjects/entities/assignment-subject.entity';

@Entity('grados' )
export class Grade {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_nivel',
    })
    idLevel: number;

    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'grado',
    })
    name: string | null;

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

    @ManyToOne(() => Level, (level) =>  level.grades)
    level: Level;

    @OneToMany(() => Group, (group) => group.grade)
    groups: Group[];

    @OneToMany(() => Inscription, (inscription) => inscription.grade)
    inscriptions: Inscription[];
    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.grade)
    assignmentsSubjects: AssignmentSubject;
}
