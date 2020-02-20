import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { SystemExtraCharges } from '../../../../system/system-extra-charges/entities/system-extra-charges.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';

export enum OperationApplicationEnum {
    sum = 'sum',
    subtraction = 'subtraction',
    division = 'division',
    multiplication = 'multiplication',
}

export enum TypeChargeApplicationEnum {
    percentage = 1,
    quantity = 2,
}

@Entity('mini-store-details-extra-charges')
export class MiniStoreDetailsExtraCharges extends Base {

    @Column('varchar', {
        nullable: false,
    })
    name: string;

    @Column('int', {
        nullable: false,
    })
    quantity: number;

    @Column({
        type: 'enum',
        nullable: true,
        enum: TypeChargeApplicationEnum,
    })
    applicationType: OperationApplicationEnum;

    @Column({
        type: 'enum',
        nullable: true,
        enum: OperationApplicationEnum,
    })
    operationType: OperationApplicationEnum;

    @Column({
        type: 'enum',
        nullable: true,
        enum: SystemTypeExtraChargesEnum,
    })
    typeExtraCharge: SystemTypeExtraChargesEnum;

    @ManyToOne(() => MiniStoreSaleDetail, (miniStoreSaleDetail) => miniStoreSaleDetail.extraCharges)
    miniSaleChargeDetails: MiniStoreSaleDetail;

    @ManyToOne(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargeMiniStore)
    systemExtraCharges: SystemExtraCharges;
}
