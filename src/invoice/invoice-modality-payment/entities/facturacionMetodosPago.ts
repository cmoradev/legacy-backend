import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('facturacion_metodos_pago')
export class FacturacionMetodosPago extends Base {
    @Column('varchar', {
        nullable: false,
        length: 90,
        name: 'nombre',
    })
    nombre: string;

    @Column('varchar', {
        nullable: false,
        length: 5,
        name: 'codigo',
    })
    codigo: string;

}
