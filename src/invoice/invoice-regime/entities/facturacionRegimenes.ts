import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity('facturacion_regimenes')
export class FacturacionRegimenes extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  nombre: string;


}
