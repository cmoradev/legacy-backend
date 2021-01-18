import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('ac_cobro_det_descuentos')
export class AcademyChargeDiscounts extends Base {


  @Field()
  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  nombre: string;

  @Field()
  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  porcentaje: number;

  @Field()
  @Column('int', {
    nullable: false,
    name: 'id_ac_descuento',
  })
  idAcDescuento: number;

  @Field()
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_ac_concepto',
  })
  idAcConcepto: number;

  @Field()
  @Column('int', {
    nullable: false,
    name: 'id_cobro_detalle',
  })
  idCobroDetalle: number;


}
