import { Column, Entity, ManyToOne } from 'typeorm';
import {
  OperationApplicationEnum,
  TypeChargeApplicationEnum,
} from '../../../system/system-extra-charges/enums/system-extra-charges.enum';
import { SystemTypeExtraChargesEnum } from '../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { PaymentPlanConcept } from '../../payment-plan-concepts/entities/payment-plan-concept.entity';
import { SystemExtraCharges } from '../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class PaymentPlanConceptCharges extends Base {
  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column('int', {
    nullable: false,
  })
  quantity: number;

  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: TypeChargeApplicationEnum,
  })
  applicationType: TypeChargeApplicationEnum;

  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: OperationApplicationEnum,
  })
  operationType: OperationApplicationEnum;

  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: SystemTypeExtraChargesEnum,
  })
  typeExtraCharge: SystemTypeExtraChargesEnum;

  @ManyToOne(() => PaymentPlanConcept, (paymentPlan) => paymentPlan.extraCharges)
  paymentPlanChargeDetail: PaymentPlanConcept;

  @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchool)
  systemExtraCharges: SystemExtraCharges;
}