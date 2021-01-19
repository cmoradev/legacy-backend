import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_inscrip_estados')
export class InscriptionStatus extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'nombre',
  })
  name: string;

}
