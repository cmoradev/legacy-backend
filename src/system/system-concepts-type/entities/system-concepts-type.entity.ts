import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademyConcepts } from '../../../academy/academy-concepts/entities/academy-concepts.entity';
import { AcademyInscriptionConcepts } from '../../../academy/academy-inscription-concepts/entities/academy-inscription-concepts.entity';

@Entity('ac_conceptos_cobro')
export class SystemConceptsType {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 190,
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

  @OneToMany(type => AcademyConcepts, concepts => concepts.academyConceptsType)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  systemConceptAcademy: AcademyConcepts[];

  @OneToMany(type => AcademyInscriptionConcepts, concepts => concepts.acInsConConcepType)
    // @JoinColumn({ name: 'id', referencedColumnName: 'country_id' })
  systemConceptAcInsConcept: AcademyInscriptionConcepts[];

}
