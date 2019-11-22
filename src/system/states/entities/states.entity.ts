import {
  Column,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Cities } from '../../cities/entities/cities.entity';

@Entity('states')
export class States {

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
    name: 'country_id',
  })
  countryID: number;

  @ManyToOne(type => Country, country => country.states)
  @JoinColumn({
    name: 'country_id',
    referencedColumnName: 'id',
  })
  country: Country;

  @OneToMany(type => Cities, city => city.state)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  cities: Cities[];

}
