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

}
