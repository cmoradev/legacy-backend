import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import {
  OperationApplicationEnum,
  TypeChargeApplicationEnum,
} from '../../../system/system-extra-charges/enums/system-extra-charges.enum';
import { SystemTypeExtraChargesEnum } from '../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SystemExtraCharges } from '../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class SchoolPaymentCharge extends Base{

  @Field()
  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
  })
  quantity: number;

  @Field()
  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: TypeChargeApplicationEnum,
  })
  applicationType: TypeChargeApplicationEnum;

  @Field()
  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: OperationApplicationEnum,
  })
  operationType: OperationApplicationEnum;

  @Field()
  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: SystemTypeExtraChargesEnum,
  })
  typeExtraCharge: SystemTypeExtraChargesEnum;

  @Field(type => SchoolPayment)
  @ManyToOne(() => SchoolPayment, (schoolPayment) => schoolPayment.extraCharges)
  schoolPaymentChargeDetail: SchoolPayment;

  @Field(type => SystemExtraCharges)
  @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchoolPayments)
  systemExtraCharges: SystemExtraCharges;
}
