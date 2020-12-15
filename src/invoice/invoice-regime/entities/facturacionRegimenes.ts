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
import { Base } from '../../../common/orm/entities/base.entity';


@Entity('facturacion_regimenes')
export class FacturacionRegimenes extends Base {

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  nombre: string;


}
