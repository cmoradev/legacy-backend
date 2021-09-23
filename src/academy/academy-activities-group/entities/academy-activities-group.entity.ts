import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { Shift } from '../../../system/shift/entities/shift.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_grupos')
export class AcademyActivitiesGroup extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'nombre',
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'horario',
    })
    schedule: string;

    @Field()
    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'id_maestro',
    })
    idMaestro: number | null;

    @Field({ nullable: true })
    @Column('int', {
        nullable: true,
        name: 'min',
    })
    min: number | null;

    @Field()
    @Column('int', {
        nullable: false,
        default: () => '\'20\'',
        name: 'max',
    })
    max: number;

    @Field()
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'activo',
    })
    isActive: number;

    @Field(type => AcademyActivity)
    @ManyToOne(type => AcademyActivity, activity => activity.academyActivityGroups)
    @JoinColumn({
        name: 'id_academia',
        referencedColumnName: 'id',
    })
    academyGroupActivity: AcademyActivity;

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.academyGroup)
    acGroupAcInsc: AcademyInscription[];

    @Field(type => [Cycle])
    @ManyToOne(type => Cycle, cycle => cycle.cycleAcademyGroups)
    @JoinColumn({
        name: 'id_ciclo',
        referencedColumnName: 'id',
    })
    academyGroupCycle: Cycle;

    @Field(type => BranchOffice)
    @ManyToOne(type => BranchOffice, campus => campus.campusAcademyGroups)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    academyGroupCampus: BranchOffice;

    @Field(type => Shift)
    @ManyToOne(type => Shift, shift => shift.shiftActivityGroups)
    @JoinColumn({
        name: 'id_turno',
        referencedColumnName: 'id',
    })
    academyGroupShift: Shift;

}
