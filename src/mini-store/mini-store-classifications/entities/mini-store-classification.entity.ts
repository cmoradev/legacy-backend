import {
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreProduct } from '../../mini-store-products/entities/mini-store-product.entity';
import { MiniStoreSaleDetail } from '../../store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { CashRegisterTransactionType } from '../../cash-register-transactions/enums/cash-register-transaction-type.enum';

@ObjectType()
@Entity('tie_clasificaciones')
export class MiniStoreClassification extends Base{

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'nombre',
    })
    name: string;

    @Field()
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: boolean;

    @Field(type => [MiniStoreProduct])
    @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storeClassification)
    storeProducts: MiniStoreProduct[];

    @Field(type => [MiniStoreSaleDetail])
    @OneToMany(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.miniStoreClassification)
    miniStoreSaleDetails: MiniStoreSaleDetail[];

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.id, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({
        name: 'branchOfficeIDId',
        referencedColumnName: 'id',
    })
    branchOffice: BranchOffice;

}
