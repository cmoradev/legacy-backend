import { Column, Entity } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity('ac_cobro_det_recargos')
export class AcademyChargeSurcharges extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  nombre: string;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  porcentaje: number;


  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'id_ac_recargo',
  })
  idAcRecargo: number;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_ac_concepto',
  })
  idAcConcepto: number;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    name: 'id_cobro_detalle',
  })
  idCobroDetalle: number;

}
