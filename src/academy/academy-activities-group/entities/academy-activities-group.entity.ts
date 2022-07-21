import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { Shift } from '../../../system/shift/entities/shift.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('ac_grupos')
export class AcademyActivitiesGroup extends Base {
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'horario',
    })
    schedule: string;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'id_maestro',
    })
    idMaestro: number | null;

    @Column('int', {
        nullable: true,
        name: 'min',
    })
    min: number | null;

    @Column('int', {
        nullable: false,
        default: () => '\'20\'',
        name: 'max',
    })
    max: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'activo',
    })
    isActive: number;

    @ManyToOne(type => AcademyActivity, activity => activity.academyActivityGroups)
    @JoinColumn({
        name: 'id_academia',
        referencedColumnName: 'id',
    })
    academyGroupActivity: AcademyActivity;

    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.academyGroup)
    acGroupAcInsc: AcademyInscription[];

    @ManyToOne(type => Cycle, cycle => cycle.cycleAcademyGroups)
    @JoinColumn({
        name: 'id_ciclo',
        referencedColumnName: 'id',
    })
    academyGroupCycle: Cycle;

    @ManyToOne(type => BranchOffice, campus => campus.campusAcademyGroups)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    academyGroupCampus: BranchOffice;

    @ManyToOne(type => Shift, shift => shift.shiftActivityGroups)
    @JoinColumn({
        name: 'id_turno',
        referencedColumnName: 'id',
    })
    academyGroupShift: Shift;

}
