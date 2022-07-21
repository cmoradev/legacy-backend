import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Grade } from '../../grades/entities/grade.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('grupos' )
export class Group extends Base {

    @Column('int', {
        nullable: false,
        name: 'id_grado',
    })
    idGrade: number;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'grupo',
    })
    name: string;

    @Column('int', {
        nullable: true,
        name: 'min',
    })
    min: number | null;

    @Column('int', {
        nullable: true,
        name: 'max',
    })
    max: number | null;

    @Column('int', {
        nullable: false,
        name: 'id_ciclos',
    })
    idCycle: number;

    @ManyToOne(() => Grade, (grade) => grade.groups)
    groupGrade: Grade;

    @ManyToOne(() => Cycle, (cycle) => cycle.groups)
    groupCycle: Cycle;

    @OneToMany(() => Inscription, (inscription) => inscription.inscripGroup)
    groupInscriptions: Inscription[];

    @OneToMany(() => Classroom, (classroom) => classroom.group )
    groupClassrooms: Classroom[];

    @OneToMany(() => AcademyInscription, (acInscription) => acInscription.schoolGroup)
    groupAcademyInscription: AcademyInscription[];
}
