import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AcademyChargeDetailsExtraCharge } from '../../academy-charge-details-extra-charge/entities/academy-charge-details-extra-charge.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';
import { AcademyInscriptionConcepts } from '../../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { Base } from '../../../../common/orm/entities/base.entity';

@Entity('ac_cobro_detalle')
export class AcademyChargeDetails extends Base {


    @Column('varchar', {
        nullable: false,
        length: 20,
        name: 'codigo_producto',
    })
    codeProduct: string;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'codigo_unidad',
    })
    codeUnit: string | null;

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'unidad',
    })
    unit: string | null;

    @Column('varchar', {
        nullable: false,
        name: 'concepto',
    })
    concept: string;

    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_concepto',
    })
    codeConcept: string;

    @Column('int', {
        nullable: false,
        name: 'cantidad',
    })
    quantity: number;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: number;
    
    @ManyToOne(() => AcademyCharge, (schoolCharge) => schoolCharge.chargesDetails)
    @JoinColumn({
        name: 'id_ac_cobro',
        referencedColumnName: 'id',
    })
    academyCharge: AcademyCharge;

    @OneToMany(() => AcademyChargeDetailsExtraCharge, (extraCharges) => extraCharges.chargeDetail, {
        cascade: ['insert'],
    })
    extraCharges: AcademyChargeDetailsExtraCharge[];

    @ManyToOne(type => AcademyInscriptionConcepts, schoolPayment => schoolPayment.academyChargeDetail, {
        cascade: ['insert'],
    })
    academyInscriptionConcept: AcademyInscriptionConcepts;

    // falta relacion con el concepto de cobro de academia
    @Column('int', {
        nullable: false,
        name: 'id_concepto_cobro',
    })
    idConceptoCobro: number;
}
