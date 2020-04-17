import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AcademyChargeDetailsExtraCharge } from '../../academy-charge-details-extra-charge/entities/academy-charge-details-extra-charge.entity';
import { SchoolCharge } from '../../../../school-colegio-ingles/charges-school/school-charges/entities/school-charge.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';

@Entity('ac_cobro_detalle')
export class AcademyChargeDetails {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 20,
        name: 'codigo_producto',
    })
    codigoProducto: string;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'codigo_unidad',
    })
    codigoUnidad: string | null;

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'unidad',
    })
    unidad: string | null;

    @Column('varchar', {
        nullable: false,
        name: 'concepto',
    })
    concepto: string;

    @Column('varchar', {
        nullable: false,
        length: 8,
        name: 'codigo_concepto',
    })
    codigoConcepto: string;

    @Column('int', {
        nullable: false,
        name: 'cantidad',
    })
    cantidad: number;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: number;

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
    // falta relacion con el concepto de cobro de academia
    @Column('int', {
        nullable: false,
        name: 'id_concepto_cobro',
    })
    idConceptoCobro: number;
}
