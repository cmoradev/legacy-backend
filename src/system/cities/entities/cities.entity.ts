import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
