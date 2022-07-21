import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../../levels/entities/level.entity';
import { Group } from '../../groups/entities/group.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { AssignmentSubject } from '../../assignments-subjects/entities/assignment-subject.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('grados')
export class Grade extends Base {

    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'grado',
    })
    name: string | null;


    @ManyToOne(() => Level, (level) => level.grades)
    level: Level;

    @Column('int', {
        nullable: true,
        name: 'levelId',
    })
    levelId: number | string | null;

    @ManyToMany(type => PaymentPlan, paymentPlan => paymentPlan.grades)
    paymentPlans: PaymentPlan[];

    @ManyToMany(type => PaymentPlanConcept, paymentPlanConcept => paymentPlanConcept.grades)
    paymentPlansConcepts: PaymentPlanConcept[];

    @OneToMany(() => Group, (group) => group.groupGrade)
    groups: Group[];

    @OneToMany(() => Classroom, (classroom) => classroom.grade)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.inscripGrade)
    gradeInscriptions: Inscription[];

    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.grade)
    assignmentsSubjects: AssignmentSubject[];

    @OneToMany(() => AcademyInscription, (acInscription) => acInscription.schoolGrade)
    gradeAcademyInscription: AcademyInscription[];
}
