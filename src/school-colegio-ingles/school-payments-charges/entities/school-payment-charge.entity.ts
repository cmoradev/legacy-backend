import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import {
  OperationApplicationEnum,
  TypeChargeApplicationEnum,
} from '../../../system/system-extra-charges/enums/system-extra-charges.enum';
import { SystemTypeExtraChargesEnum } from '../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SystemExtraCharges } from '../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';

@Entity('school_payment_charge')
export class SchoolPaymentCharge extends Base{

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

  @ManyToOne(() => SchoolPayment, (schoolPayment) => schoolPayment.extraCharges)
  schoolPaymentChargeDetail: SchoolPayment;

  // todo
  // FALTA PONER EL ID CORRECTO DEL NOMBRE DE LA COLUMNA
  @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeSchoolPayment)
  systemExtraCharges: SystemExtraCharges;
}
