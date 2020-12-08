import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('ac_cobro_det_descuentos')
export class AcademyChargeDiscounts extends Base {


  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  nombre: string;

  @Column('int', {
    nullable: false,
    name: 'porcentaje',
  })
  porcentaje: number;

  @Column('int', {
    nullable: false,
    name: 'id_ac_descuento',
  })
  idAcDescuento: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_ac_concepto',
  })
  idAcConcepto: number;

  @Column('int', {
    nullable: false,
    name: 'id_cobro_detalle',
  })
  idCobroDetalle: number;
  

}
