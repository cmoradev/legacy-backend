import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn} from 'typeorm';
import {Level} from '../../levels/entities/level.entity';
import {Student} from '../../students/entities/student.entity';
import {Inscription} from './inscription.entity';
import {Family} from './family.entity';

@Entity('planteles')
export class Campus {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'plantel',
    })
    name: string;

    @Column('int', {
        nullable: false,
        name: 'id_ubicacion',
    })
    idLocation: number;

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

    @OneToMany(() => Level, (level) => level.campus)
    levels: Level[];

    @OneToMany(() => Student, (student) => student.campus)
    students: Student[];

    @OneToMany(() => Inscription, (inscription) => inscription.campus)
    inscriptions: Inscription[];

    @OneToMany(() => Family, (family) => family.campus)
    families: Family[];
}
