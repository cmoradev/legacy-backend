import { Column, Entity } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('ac_cobro_det_recargos')
export class AcademyChargeSurcharges extends Base {

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
    name: 'id_ac_recargo',
  })
  idAcRecargo: number;

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
