import { Column, Entity, OneToMany } from 'typeorm';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_turnos')
export class Shift extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 60,
    name: 'nombre',
  })
  name: string;

  @Field(type => [AcademyActivitiesGroup])
  @OneToMany(() => AcademyActivitiesGroup, (academyActivitiesGroup) => academyActivitiesGroup.academyGroupShift)
  shiftActivityGroups: AcademyActivitiesGroup[];

}
