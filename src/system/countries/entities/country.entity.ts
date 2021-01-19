import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { States } from '../../states/entities/states.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('countries')
export class Country {

  @Field(type => ID)
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 3,
    name: 'sortname',
  })
  sortname: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'name',
  })
  name: string;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'phonecode',
  })
  phonecode: number;

  @Field(type => States)
  @OneToMany(type => States, state => state.country)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  states: States[];

}
