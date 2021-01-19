import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AcademyChargeDetailsExtraCharge } from '../../academy-charge-details-extra-charge/entities/academy-charge-details-extra-charge.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';
import { AcademyInscriptionConcepts } from '../../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_cobro_detalle')
export class AcademyChargeDetails extends Base {


    @Field()
    @Column('varchar', {
        nullable: false,
        length: 20,
        name: 'codigo_producto',
    })
    codeProduct: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'codigo_unidad',
    })
    codeUnit: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'unidad',
    })
    unit: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        name: 'concepto',
    })
    concept: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_concepto',
    })
    codeConcept: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'cantidad',
    })
    quantity: number;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: number;

    @Field(type => AcademyCharge)
    @ManyToOne(() => AcademyCharge, (schoolCharge) => schoolCharge.chargesDetails)
    @JoinColumn({
        name: 'id_ac_cobro',
        referencedColumnName: 'id',
    })
    academyCharge: AcademyCharge;

    @Field(type => [AcademyChargeDetailsExtraCharge])
    @OneToMany(() => AcademyChargeDetailsExtraCharge, (extraCharges) => extraCharges.chargeDetail, {
        cascade: ['insert'],
    })
    extraCharges: AcademyChargeDetailsExtraCharge[];

    @Field(type => AcademyInscriptionConcepts)
    @ManyToOne(type => AcademyInscriptionConcepts, schoolPayment => schoolPayment.academyChargeDetail, {
        cascade: ['insert'],
    })
    academyInscriptionConcept: AcademyInscriptionConcepts;

    @Field(type => Int)
    // falta relacion con el concepto de cobro de academia
    @Column('int', {
        nullable: false,
        name: 'id_concepto_cobro',
    })
    idConceptoCobro: number;
}
