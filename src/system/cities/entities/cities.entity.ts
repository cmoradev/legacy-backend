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
import { Country } from '../../countries/entities/country.entity';
import { States } from '../../states/entities/states.entity';

@Entity('cities')
export class Cities {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'name',
  })
  name: string;

  @Column('int', {
    nullable: false,
    name: 'state_id',
  })
  stateId: number;

  @ManyToOne(type => States, state => state.cities)
  @JoinColumn({
    name: 'state_id',
    referencedColumnName: 'id',
  })
  state: States;

}
