import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';

@Entity('niveles')
export class Level {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idPlantel: number;

    @Column('varchar', {
        nullable: false,
        length: 40,
        name: 'nivel',
    })
    name: string;

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
    @OneToMany(() => PaymentPlan, (paymentPlan) => paymentPlan.level)
    paymentPlans: PaymentPlan[];

    @ManyToOne(() => BranchOffice, (campus) => campus.levels)
    campus: BranchOffice;

    @OneToMany(() => Grade, (grade) => grade.level)
    grades: Grade[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripLevel)
    levelInscriptions: Inscription[];

    @OneToMany(() => StudyPlan, (studyPlan) => studyPlan.level)
    studyPlans: StudyPlan[];

    @OneToMany(() => Classroom, (classroom) => classroom.level)
    classrooms: Classroom[];

    @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsLevel)
    levelAcademyConcepts: AcademyConcepts[];

    @OneToMany(() => AcademyInscription, (acInscription) => acInscription.schoolLevel)
    levelAcademyInscription: AcademyInscription[];
}
