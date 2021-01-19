import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { States } from '../../states/entities/states.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('cities')
export class Cities {

  @Field(type => ID)
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'name',
  })
  name: string;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'state_id',
  })
  stateId: number;

  @Field(type => States)
  @ManyToOne(type => States, state => state.cities)
  @JoinColumn({
    name: 'state_id',
    referencedColumnName: 'id',
  })
  state: States;

}
