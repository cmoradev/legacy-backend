import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
import { isDesktop } from '../../../common/desktop/desktop.config';

@Entity('ciclos')
export class Cycle extends Base {


    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'ciclo',
    })
    name: string;

    @Column( {
        type: isDesktop ? 'date': 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_inicio',
    })
    dateStart: Date;

    @Column({
        type: isDesktop ? 'date': 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_fin',
    })
    dateEnd: Date;

    @Column('tinyint', {
        nullable: false,
        name: 'active',
    })
    isActive: number;

    @OneToMany(() => Periods, (periods) => periods.periodsCycle)
    cyclePeridos: Periods[];

    @OneToMany(() => Group, (group) => group.groupCycle)
    groups: Group[];

    @OneToMany(() => Classroom, (classroom) => classroom.cycle)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripCycle)
    cycleInscriptions: Inscription[];

    @OneToMany(() => Assignment, (assignment) => assignment.cycle)
    assignments: Assignment[];

    @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsCycle)
    cycleAcademyConcepts: AcademyConcepts[];

    @OneToMany(() => AcademyActivitiesGroup, (academyGroup) => academyGroup.academyGroupCycle)
    cycleAcademyGroups: AcademyActivitiesGroup[];

    @OneToMany(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargesCycle)
    cycleSystemExtraCharges: SystemExtraCharges[];

    @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.cycle)
    cycleAcIns: AcademyInscription[];

    @OneToMany(() => SchoolCharge, (shoolCharge) => shoolCharge.schoolCycle)
    cycleSchoolCharge: SchoolCharge[];

    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.chargeCycle)
    cycleAcademyCharge: AcademyCharge[];

    @OneToMany(type => MiniStoreSale, (sale) => sale.cycle)
    sales: MiniStoreSale[];
}
