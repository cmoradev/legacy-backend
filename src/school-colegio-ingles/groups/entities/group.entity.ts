import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Grade } from '../../grades/entities/grade.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('grupos' )
export class Group extends Base {

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_grado',
    })
    idGrade: number;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'grupo',
    })
    name: string;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'min',
    })
    min: number | null;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'max',
    })
    max: number | null;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_ciclos',
    })
    idCycle: number;

    @Field(type => Grade)
    @ManyToOne(() => Grade, (grade) => grade.groups)
    groupGrade: Grade;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.groups)
    groupCycle: Cycle;

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripGroup)
    groupInscriptions: Inscription[];

    @Field(type => [Classroom])
    @OneToMany(() => Classroom, (classroom) => classroom.group )
    groupClassrooms: Classroom[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (acInscription) => acInscription.schoolGroup)
    groupAcademyInscription: AcademyInscription[];
}
