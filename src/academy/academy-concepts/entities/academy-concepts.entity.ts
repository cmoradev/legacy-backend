import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SystemConceptsType } from '../../../system/system-concepts-type/entities/system-concepts-type.entity';
import { Cycle } from '../../../school-colegio-ingles/cycles/entities/cycle.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { AcademyActivity } from '../../academy-activities/entities/academy-activity.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('ac_aconceptos')
export class AcademyConcepts extends Base {
    @Column('varchar', {
        nullable: false,
        length: 300,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: true,
        name: 'descripcion',
    })
    description: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'precio',
    })
    price: number;

    @Column('varchar', {nullable: false, default: () => '\'E48\''})
    unitMeasurement: string;

    @Column('varchar', {nullable: false, length: 2, default: () => '\'02\''})
    objetoImp: string;

    @Column('varchar', {nullable: false, length: 25, name: 'sat_code', default: () => '\'14111514\''})
    sat_code: string;

    @ManyToOne(type => Cycle, cycle => cycle.cycleAcademyConcepts)
    @JoinColumn({
        name: 'id_ciclo',
        referencedColumnName: 'id',
    })
    academyConceptsCycle: Cycle;

    @ManyToOne(type => BranchOffice, campus => campus.campusAcademyConcepts)
    @JoinColumn({
        name: 'id_plantel',
        referencedColumnName: 'id',
    })
    academyConceptsCampus: BranchOffice;

    @Column('varchar', {
        nullable: true,
        name: 'id_nivel',
    })
    academyConceptsLevel: string;

    @ManyToOne(type => SystemConceptsType, state => state.systemConceptAcademy)
    @JoinColumn({
        name: 'id_tipo_concepto',
        referencedColumnName: 'id',
    })
    academyConceptsType: SystemConceptsType;

    @ManyToOne(type => AcademyActivity, activity => activity.academyActivityConcepts)
    @JoinColumn({
        name: 'id_academia',
        referencedColumnName: 'id',
    })
    academyConceptsActivity: AcademyActivity;

    @Column('int', {
        nullable: true,
        default: () => '\'1\'',
        name: 'escolar',
    })
    school: number | null;

    @Column('tinyint', {
        nullable: true,
        width: 1,
        default: () => '\'0\'',
        name: 'externos',
    })
    external: boolean | null;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_iva',
    })
    isIva: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_isr',
    })
    isIsr: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'is_ivaretencion',
    })
    isIvaretencion: number;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        default: () => '\'1\'',
        name: 'active',
    })
    isActive: boolean;

}
