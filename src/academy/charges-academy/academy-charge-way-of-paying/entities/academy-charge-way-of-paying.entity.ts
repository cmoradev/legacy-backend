import { Column, Entity } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('ac_cobro_forma_pago')
export class AcademyChargeWayOfPaying extends Base {
    @Column('int', {
        nullable: false,
        name: 'id_forma_pago',
    })
    idFormaPago: number;

    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'codigo_forma_pago',
    })
    codigoFormaPago: string;

    @Column('varchar', {
        nullable: true,
        name: 'nombre_forma_pago',
    })
    nombreFormaPago: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cantidad',
    })
    cantidad: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_banco',
    })
    idBanco: number;

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'banco',
    })
    banco: string | null;

    @Column('date', {
        nullable: true,
        name: 'fecha',
    })
    fecha: string | null;

    @Column('varchar', {
        nullable: false,
        length: 90,
        name: 'cuenta',
    })
    cuenta: string;

    @Column('int', {
        nullable: false,
        name: 'id_ac_cobro',
    })
    idAcCobro: number;

}
