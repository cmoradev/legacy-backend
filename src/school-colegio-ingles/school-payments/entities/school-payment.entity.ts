import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { SchoolChargeDetails } from '../../charges-school/school-charges-details/entities/school-charge-details.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';

@Entity()
export class SchoolPayment extends Base {
  @Column('varchar', {
    nullable: false,
    length: 20,
  })
  productCode: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
  })
  unitCode: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
  })
  unit: string | null;

  @Column('varchar', {
    nullable: true,
    length: 250,
  })
  description: string | null;

  @Column( 'int', {
    nullable: false,
    default: 1,
  })
  quantity: number;

  @Column('date', {
    nullable: true,
  })
  payDay: string | null;

  @Column('decimal', {
    nullable: true,
    default: () => '0.000000',
    precision: 15,
    scale: 6,
  })
  price: number | null;

  @Column('boolean', {
    nullable: false,
    default: true,
  })
  withIva: number;

  @Column('decimal', {
    nullable: false,
    default: () => '0.000000',
    precision: 15,
    scale: 6,
  })
  iva: string;

  @Column('boolean', {
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => SchoolChargeDetails, (schoolCharge) => schoolCharge.schoolPayment)
  @JoinColumn()
  schoolChargeDetail: SchoolChargeDetails;

  @ManyToOne(() => Inscription, (inscription) => inscription.schoolPayments)
  inscriptions: Inscription[];
}
