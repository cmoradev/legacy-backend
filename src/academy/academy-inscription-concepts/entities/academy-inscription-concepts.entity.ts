import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { SystemConceptsType } from '../../../system/system-concepts-type/entities/system-concepts-type.entity';
import { AcademyInscription } from '../../academy-inscription/entities/academy-inscription.entity';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { AcademyChargeDetails } from '../../charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { AcademyInscriptionConceptCharges } from '../../academy-inscription-concept-charges/entites/academy-inscription-concept-charges.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_inscrip_conceptos')
export class AcademyInscriptionConcepts extends Base {


    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'clave_inscripcion',
    })
    keyInscription: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 20,
        name: 'codigo_producto',
    })
    productCode: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 20,
        name: 'codigo_unidad',
    })
    unitCode: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'unidad',
    })
    unit: string | null;

    @Field(type => AcademyActivity)
    @ManyToOne(type => AcademyActivity, activity => activity.academyActAcInsConcept)
    @JoinColumn({
        name: 'id_academia',
        referencedColumnName: 'id',
    })
    acInsConActivity: AcademyActivity;

    @Field(type => SystemConceptsType)
    @ManyToOne(type => SystemConceptsType, sysConType => sysConType.systemConceptAcInsConcept)
    @JoinColumn({
        name: 'id_concepto_cobro',
        referencedColumnName: 'id',
    })
    acInsConConcepType: SystemConceptsType;

    @Field(type => Int)
    @Column({
        name: 'id_concepto_cobro',
    })
    idConceptoCobro: number;

    @Field()
    @Column({
        type: 'simple-enum',
        enum: PaymentStatus,
        default: PaymentStatus.Debit,
        nullable: false,
        name: 'id_estado_pago',
    })
    paymentStatus: PaymentStatus;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 250,
        name: 'descripcion',
    })
    description: string | null;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
        name: 'cantidad',
    })
    quantity: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
    })
    payDay: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
    })
    payMonth: number;

    @Field({ nullable: true })
    @Column('date', {
        nullable: true,
        name: 'fecha_pago',
    })
    payDate: Date;

    @Field({ nullable: true })
    @Column('date', {
        nullable: true,
        name: 'fecha_pagado',
    })
    paidDate: Date;

    @Field(type => Int)
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: number | null;


    @Field(type => Int, { nullable: true })
    @Column('decimal', {
        nullable: true,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'oldprecio',
    })
    oldPrice: number | null;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_ac_cobro',
    })
    idAcCobro: number;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIva: number;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: boolean;

    @Field(type => AcademyInscription)
    @ManyToOne(() => AcademyInscription, (AcInscription) => AcInscription.concepts)
    acInscription: AcademyInscription;

    @Field(type => [AcademyChargeDetails])
    @OneToMany(type => AcademyChargeDetails, chargeDetails => chargeDetails.academyInscriptionConcept)
    academyChargeDetail: AcademyChargeDetails[];

    @Field(type => [AcademyInscriptionConceptCharges])
    @OneToMany(() => AcademyInscriptionConceptCharges, (extraCharges) => extraCharges.inscChargeDetail, {
        cascade: ['insert'],
    })
    extraCharges: AcademyInscriptionConceptCharges[];

}
