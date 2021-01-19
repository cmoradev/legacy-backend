import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Cities } from '../../cities/entities/cities.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('states')
export class States {

  @Field(type => Int)
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
    name: 'country_id',
  })
  countryID: number;

  @Field(type => Country)
  @ManyToOne(type => Country, country => country.states)
  @JoinColumn({
    name: 'country_id',
    referencedColumnName: 'id',
  })
  country: Country;

  @Field(type => [Cities])
  @OneToMany(type => Cities, city => city.state)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  cities: Cities[];

}
