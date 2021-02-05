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
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('grados')
export class Grade extends Base {

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'grado',
    })
    name: string | null;


    @Field(type => Level)
    @ManyToOne(() => Level, (level) => level.grades)
    level: Level;

    @Field(type => Int)
    @Column('int', {
        nullable: true,
        name: 'levelId',
    })
    levelId: number | string | null;

    @Field(type => [PaymentPlan])
    @ManyToMany(type => PaymentPlan, paymentPlan => paymentPlan.grades)
    paymentPlans: PaymentPlan[];

    @Field(type => [PaymentPlanConcept])
    @ManyToMany(type => PaymentPlanConcept, paymentPlanConcept => paymentPlanConcept.grades)
    paymentPlansConcepts: PaymentPlanConcept[];

    @Field(type => [Group])
    @OneToMany(() => Group, (group) => group.groupGrade)
    groups: Group[];

    @Field(type => [Classroom])
    @OneToMany(() => Classroom, (classroom) => classroom.grade)
    classrooms: Classroom[];

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripGrade)
    gradeInscriptions: Inscription[];

    @Field(type => [AssignmentSubject])
    @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.grade)
    assignmentsSubjects: AssignmentSubject[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (acInscription) => acInscription.schoolGrade)
    gradeAcademyInscription: AcademyInscription[];
}
