import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyInscriptionConcepts } from '../../../academy/academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_conceptos_cobro')
export class SystemConceptsType extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 190,
    name: 'nombre',
  })
  name: string;

  @Field(type => [AcademyConcepts])
  @OneToMany(type => AcademyConcepts, concepts => concepts.academyConceptsType)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  systemConceptAcademy: AcademyConcepts[];

  @Field(type => [AcademyInscriptionConcepts])
  @OneToMany(type => AcademyInscriptionConcepts, concepts => concepts.acInsConConcepType)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  systemConceptAcInsConcept: AcademyInscriptionConcepts[];

}
