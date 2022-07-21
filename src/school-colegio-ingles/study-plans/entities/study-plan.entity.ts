import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Level } from '../../levels/entities/level.entity';
import { Modality } from '../../modalities/entities/modality.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { SchoolCharge } from '../../charges-school/school-charges/entities/school-charge.entity';

@Entity()
export class StudyPlan extends Base {

    @Column()
    name: string;

    @Column()
    code: string;

    @Column('varchar', {
        nullable: false,
    })
    status: string;

    @OneToMany(type => StudyPlanVariant, (studyPlanVariants) => studyPlanVariants.studyPlan)
    studyPlansVariants: StudyPlanVariant[];

    @ManyToOne(type => Modality, (modality) => modality.studyPlans)
    modality: Modality;

    @OneToMany(type => Assignment, (assignment) => assignment.studyPlan)
    assignment: Assignment;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: string;

    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    endDate: string | null;

    @ManyToOne(() => Level, (level) => level.studyPlans)
    level: Level;

    @OneToMany(() => Classroom, (classroom) => classroom.studyPlan)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudyPlan)
    studyPlaninscriptions: Inscription[];

    @ManyToOne(() => PaymentPlan, (paymentPlan) => paymentPlan.studyPlan )
    paymentPlans: PaymentPlan[];

    @OneToMany(() =>SchoolCharge, (schoolCharge) => schoolCharge.studyPlans)
    schoolCharges: SchoolCharge[];
}
