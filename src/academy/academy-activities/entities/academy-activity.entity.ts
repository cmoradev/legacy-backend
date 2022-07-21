import { Column, Entity, OneToMany } from 'typeorm';
import { AcademyConcepts } from '../../academy-concepts/entities/academy-concepts.entity';
import { AcademyActivitiesGroup } from '../../academy-activities-group/entities/academy-activities-group.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';
import { AcademyInscriptionConcepts } from '../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('ac_academias')
export class AcademyActivity extends Base {

  @Column('varchar', {
    nullable: false,
    length: 300,
    name: 'nombre',
  })
  name: string;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'escolar',
  })
  school: boolean;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'externo',
  })
  external: boolean;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'0\'',
    name: 'incluida',
  })
  included: boolean;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '\'1\'',
    name: 'active',
  })
  isActive: boolean;

  @OneToMany(() => AcademyConcepts, (academyConcepts) => academyConcepts.academyConceptsActivity)
  academyActivityConcepts: AcademyConcepts[];

  @OneToMany(() => AcademyActivitiesGroup, (academyActivitiesGroup) => academyActivitiesGroup.academyGroupActivity)
  academyActivityGroups: AcademyActivitiesGroup[];

  @OneToMany(() => AcademyInscription, (academyInscription) => academyInscription.activity)
  academyActInscription: AcademyInscription[];

  @OneToMany(() => AcademyInscriptionConcepts, (AcInsConcepts) => AcInsConcepts.acInsConActivity)
  academyActAcInsConcept: AcademyInscriptionConcepts[];
}
