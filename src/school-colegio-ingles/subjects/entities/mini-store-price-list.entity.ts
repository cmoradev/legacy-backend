import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStoreProduct} from '../../../mini-store/mini-store-products/entities/mini-store-product.entity';

@Entity('tie_listaprecios')
export class MiniStorePriceList {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'nombre',
    })
    name: string;

    @Column('int', {
        nullable: false,
        name: 'ciclo',
    })
    cycle: number;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'active',
    })
    isActive: boolean;

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

    @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storePriceList)
    storeProducts: MiniStoreProduct[];

}
