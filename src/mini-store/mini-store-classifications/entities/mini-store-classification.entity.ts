import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {MiniStoreProduct} from '../../mini-store-products/entities/mini-store-product.entity';
import {MiniStoreSaleDetail} from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';

@Entity('tie_clasificaciones')
export class MiniStoreClassification {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'nombre',
    })
    name: string;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
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

    @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storeClassification)
    storeProducts: MiniStoreProduct[];

    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreClassification)
    miniStoreSaleDetails: MiniStoreSaleDetail[];

}
