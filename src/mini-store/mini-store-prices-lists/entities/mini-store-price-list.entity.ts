import {
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('tie_listaprecios')
export class MiniStorePriceList extends Base {

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


    @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storePriceList)
    storeProducts: MiniStoreProduct[];

    @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.id,
        {
            cascade: ['insert', 'update'],
        })
    @JoinColumn({
        name: 'branchOfficeLisIdId',
        referencedColumnName: 'id',
    })
    branchOfficeList: BranchOffice;
}
