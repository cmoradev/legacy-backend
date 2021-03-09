import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { PaymentPlan } from '../../payment-plans/entities/payment-plan.entity';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { AutRvoe } from './autrvoe.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('niveles')
export class Level extends Base {

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'id_plantel',
  })
  idPlantel: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 40,
    name: 'nivel',
  })
  name: string;

  @Field(type => [PaymentPlan])
  @OneToMany(() => PaymentPlan, (paymentPlan) => paymentPlan.level)
  paymentPlans: PaymentPlan[];

  @Field(type => BranchOffice)
  @ManyToOne(() => BranchOffice, (campus) => campus.levels)
  campus: BranchOffice;

  @Field(type => Grade)
  @OneToMany(() => Grade, (grade) => grade.level)
  grades: Grade[];

  @Field(type => [Inscription])
  @OneToMany(() => Inscription, (inscription) => inscription.inscripLevel)
  levelInscriptions: Inscription[];

  @Field(type => [StudyPlan])
  @OneToMany(() => StudyPlan, (studyPlan) => studyPlan.level)
  studyPlans: StudyPlan[];

  @Field(type => [Classroom])
  @OneToMany(() => Classroom, (classroom) => classroom.level)
  classrooms: Classroom[];

  // @Field(type => [AcademyConcepts])
  // @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsLevel)
  // levelAcademyConcepts: AcademyConcepts[];

  @Field(type => [AcademyInscription])
  @OneToMany(() => AcademyInscription, (acInscription) => acInscription.schoolLevel)
  levelAcademyInscription: AcademyInscription[];

  @Field(type => [AutRvoe])
  @OneToMany(() => AutRvoe, autRvoe => autRvoe.level)
  autRvoe: AutRvoe[];
}
