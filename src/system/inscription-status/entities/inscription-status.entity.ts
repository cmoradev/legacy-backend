import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('ac_inscrip_estados')
export class InscriptionStatus extends Base {

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'nombre',
  })
  name: string;

}
