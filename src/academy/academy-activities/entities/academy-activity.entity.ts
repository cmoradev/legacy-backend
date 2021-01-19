import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademyConcepts } from '../../academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../academy-activities-group/entities/academy-activities-group.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';
import { AcademyInscriptionConcepts } from '../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_academias')
export class AcademyActivity extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 300,
    name: 'nombre',
  })
  name: string;

  @Field()
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'escolar',
  })
  school: boolean;

  @Field()
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'externo',
  })
  external: boolean;

  @Field()
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'incluida',
  })
  included: boolean;

  @Field()
  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'1\'',
    name: 'active',
  })
  isActive: boolean;

  @Field(type => [AcademyConcepts])
  @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsActivity)
  academyActivityConcepts: AcademyConcepts[];

  @Field(type => [AcademyActivitiesGroup])
  @OneToMany(() => AcademyActivitiesGroup, (academyActivitiesGroup) => academyActivitiesGroup.academyGroupActivity)
  academyActivityGroups: AcademyActivitiesGroup[];

  @Field(type => [AcademyInscription])
  @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.activity)
  academyActInscription: AcademyInscription[];

  @Field(type => [AcademyInscriptionConcepts])
  @OneToMany(() => AcademyInscriptionConcepts, (AcInsConcepts) => AcInsConcepts.acInsConActivity)
  academyActAcInsConcept: AcademyInscriptionConcepts[];
}
