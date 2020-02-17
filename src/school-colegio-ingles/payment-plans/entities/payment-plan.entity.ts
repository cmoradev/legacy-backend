import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Level } from '../../levels/entities/level.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class PaymentPlan extends Base {

  @Column('varchar', {
    nullable: false,
    length: 300,
  })
  name: string;

  @Column('varchar', {
    nullable: true,
    length: 300,
  })
  description: string;

  @Column('boolean', {
    nullable: true,
    default: false,
  })
  isActiveInStudyPlan: boolean;

  @Column('boolean', {
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.paymentPlans)
  studyPlan: StudyPlan;

  @ManyToOne(() => Level, (level) => level.paymentPlans)
  level: Level;

  @OneToMany(() => PaymentPlanConcept,
    (paymentPlanConcept) => paymentPlanConcept.paymentPlan )
  paymentPlanConcepts: PaymentPlanConcept[];

  @OneToOne(() => Grade, (grade) => grade.paymentPlan )
  @JoinColumn()
  grade: Grade;
}
