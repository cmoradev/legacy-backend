import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('facturacion_metodos_pago')
export class FacturacionMetodosPago extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 90,
    name: 'nombre',
  })
  nombre: string;


  @Field()
  @Column('varchar', {
    nullable: false,
    length: 5,
    name: 'codigo',
  })
  codigo: string;

}
