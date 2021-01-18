import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import {
    OperationApplicationEnum,
    TypeChargeApplicationEnum,
} from '../../../../system/system-extra-charges/enums/system-extra-charges.enum';

import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('mini-store-details-extra-charges')
export class MiniStoreDetailsExtraCharges extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
    })
    name: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Field(type => TypeChargeApplicationEnum)
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: TypeChargeApplicationEnum,
    })
    applicationType: TypeChargeApplicationEnum;

    @Field(type => OperationApplicationEnum)
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Field(type => SystemTypeExtraChargesEnum)
    @Column({
        type: 'simple-enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @Field(type => MiniStoreSaleDetail)
    @ManyToOne(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.extraCharges)
    miniSaleChargeDetails: MiniStoreSaleDetail;

    @Field(type => SystemExtraCharges)
    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeMiniStore)
    systemExtraCharges: SystemExtraCharges;
}
