import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SystemConceptsType } from '../../../system/system-concepts-type/entities/system-concepts-type.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Level } from '../../../school-colegio-ingles/levels/entities/level.entity';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_aconceptos')
export class AcademyConcepts extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 300,
        name: 'nombre',
    })
    name: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        name: 'descripcion',
    })
    description: string | null;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: number;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 70,
        name: 'codigo_producto',
    })
    productCode: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'codigo_unidad',
    })
    unitCode: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'unidad',
    })
    unity: string | null;

    @Field(type => Cycle)
    @ManyToOne(type => Cycle, cycle => cycle.cycleAcademyConcepts)
    @JoinColumn({
        name: 'id_ciclo',
        referencedColumnName: 'id',
    })
    academyConceptsCycle: Cycle;

    @Field(type => BranchOffice)
    @ManyToOne(type => BranchOffice, campus => campus.campusAcademyConcepts)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    academyConceptsCampus: BranchOffice;

    @Field(type => Level)
    @ManyToOne(type => Level, level => level.levelAcademyConcepts)
    @JoinColumn({
        name: 'id_nivel',
        referencedColumnName: 'id',
    })
    academyConceptsLevel: Level;

    @Field(type => SystemConceptsType)
    @ManyToOne(type => SystemConceptsType, state => state.systemConceptAcademy)
    @JoinColumn({
        name: 'id_tipo_concepto',
        referencedColumnName: 'id',
    })
    academyConceptsType: SystemConceptsType;

    @Field(type => AcademyActivity)
    @ManyToOne(type => AcademyActivity, activity => activity.academyActivityConcepts)
    @JoinColumn({
        name: 'id_academia',
        referencedColumnName: 'id',
    })
    academyConceptsActivity: AcademyActivity;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        default: () => '\'1\'',
        name: 'escolar',
    })
    school: number | null;

    @Field({ nullable: true })
    @Column('tinyint', {
        nullable: true,
        width: 1,
        default: () => '\'0\'',
        name: 'externos',
    })
    external: boolean | null;

    @Field()
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIva: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_isr',
    })
    isIsr: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_ivaretencion',
    })
    isIvaretencion: number;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: boolean;

}
