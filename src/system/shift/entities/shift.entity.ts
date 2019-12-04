import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';

@Entity('ac_turnos')
export class Shift {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 60,
    name: 'nombre',
  })
  name: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => AcademyActivitiesGroup, (academyActivitiesGroup) => academyActivitiesGroup.academyGroupShift)
  shiftActivityGroups: AcademyActivitiesGroup[];

}
