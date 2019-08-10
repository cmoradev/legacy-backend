import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStoreProduct} from './mini-store-product.entity';

@Entity('facturacion_claves')
export class MiniStoreInvoiceKey {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 80,
        name: 'clave',
    })
    key: string;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_unidad',
    })
    idUnity: number;

    /**
     * Razón social
     */
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_razon_social',
    })
    idBusinessName: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storeInvoiceKey)
    storeProducts: MiniStoreProduct[];

}
