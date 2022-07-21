import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { States } from '../../states/entities/states.entity';

@Entity('countries')
export class Country {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 3,
    name: 'sortname',
  })
  sortname: string;

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'name',
  })
  name: string;

  @Column('int', {
    nullable: false,
    name: 'phonecode',
  })
  phonecode: number;

  @OneToMany(type => States, state => state.country)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  states: States[];

}
