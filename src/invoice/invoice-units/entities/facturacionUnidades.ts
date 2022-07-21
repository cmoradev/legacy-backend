import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('facturacion_unidades')
export class FacturacionUnidades {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'nombre',
    })
    nombre: string;
    @Column('varchar', {
        nullable: false,
        length: 4,
        name: 'codigo',
    })
    codigo: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

}
