import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';

@Entity('facturacion_bancos', { schema: 'colegio_pdc' })
export class InvoicesBank {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'nombre',
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
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => MiniStoreSaleMethodPayment, (SalesMethodPayment) => SalesMethodPayment.Bank)
  SalesMethodPayment: MiniStoreSaleMethodPayment[];
}
