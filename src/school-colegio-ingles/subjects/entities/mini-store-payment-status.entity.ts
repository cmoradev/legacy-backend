import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {MiniStoreSalePayment} from './mini-store-sale-payment.entity';

@Entity('estado_pagos')
export class MiniStorePaymentStatus {

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
    name: string;

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

    @OneToMany(() => MiniStoreSalePayment, (miniStorePayment) => miniStorePayment.miniStorePaymentStatus)
    miniStoreSalePayments: MiniStoreSalePayment[];
}
