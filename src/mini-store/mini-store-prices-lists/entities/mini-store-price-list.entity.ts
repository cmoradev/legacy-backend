import {
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
@Entity('tie_listaprecios')
export class MiniStorePriceList extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'nombre',
    })
    name: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'ciclo',
    })
    cycle: number;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'0\'',
        name: 'active',
    })
    isActive: boolean;

    @Field(type => [MiniStoreProduct])
    @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storePriceList)
    storeProducts: MiniStoreProduct[];

    @Field(type => BranchOffice)
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
