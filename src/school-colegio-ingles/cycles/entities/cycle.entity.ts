import { Column, Entity, OneToMany } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { SystemExtraCharges } from '../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { SchoolCharge } from '../../charges-school/school-charges/entities/school-charge.entity';
import { Periods } from '../../periods/entities/periods.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ciclos')
export class Cycle extends Base {


    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'ciclo',
    })
    name: string;

    @Field()
    @Column( {
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_inicio',
    })
    dateStart: Date;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_fin',
    })
    dateEnd: Date;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        name: 'active',
    })
    isActive: number;

    @Field(type => [Periods])
    @OneToMany(() => Periods, (periods) => periods.periodsCycle)
    cyclePeridos: Periods[];

    @Field(type => [Group])
    @OneToMany(() => Group, (group) => group.groupCycle)
    groups: Group[];

    @Field(type => [Classroom])
    @OneToMany(() => Classroom, (classroom) => classroom.cycle)
    classrooms: Classroom[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripCycle)
    cycleInscriptions: Inscription[];

    @Field(type => [Assignment])
    @OneToMany(() => Assignment, (assignment) => assignment.cycle)
    assignments: Assignment[];

    @Field(type => [AcademyConcepts])
    @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsCycle)
    cycleAcademyConcepts: AcademyConcepts[];

    @Field(type => [AcademyActivitiesGroup])
    @OneToMany(() => AcademyActivitiesGroup, (academyGroup) => academyGroup.academyGroupCycle)
    cycleAcademyGroups: AcademyActivitiesGroup[];

    @Field(type => [SystemExtraCharges])
    @OneToMany(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargesCycle)
    cycleSystemExtraCharges: SystemExtraCharges[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.cycle)
    cycleAcIns: AcademyInscription[];

    @Field(type => [SchoolCharge])
    @OneToMany(() => SchoolCharge, (shoolCharge) => shoolCharge.schoolCycle)
    cycleSchoolCharge: SchoolCharge[];

    @Field(type => [AcademyCharge])
    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.chargeCycle)
    cycleAcademyCharge: AcademyCharge[];

    @Field(type => [MiniStoreSale])
    @OneToMany(type => MiniStoreSale, (sale) => sale.cycle)
    sales: MiniStoreSale[];
}
