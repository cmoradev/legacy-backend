import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiniStoreSalePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { AcademyInscriptionConcepts } from '../../../academy/academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { SchoolChargePayment } from '../../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('estado_pagos')
export class SystemPaymentStatus extends Base {

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'nombre',
    })
    name: string;

}
