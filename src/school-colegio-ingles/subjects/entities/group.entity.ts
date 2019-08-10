import { Column, Entity, ManyToOne, OneToMany,  PrimaryGeneratedColumn} from 'typeorm';
import {Grade} from '../../grades/entities/grade.entity';
import {Cycle} from './cycle.entity';
import {Inscription} from './inscription.entity';
import {StudyPlan} from '../../study-plans/entities/study-plan.entity';
import {StudyPlanVariant} from '../../study-plan-variants/entities/study-plan-variants.entity';
import {Assignment} from '../../assignments/entities/assignment.entity';

@Entity('grupos' )
export class Group {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_grado',
    })
    idGrade: number;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'grupo',
    })
    name: string;

    @Column('int', {
        nullable: true,
        name: 'min',
    })
    min: number | null;

    @Column('int', {
        nullable: true,
        name: 'max',
    })
    max: number | null;

    @Column('int', {
        nullable: false,
        name: 'id_ciclos',
    })
    idCycle: number;

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

    @ManyToOne(() => Grade, (grade) => grade.groups)
    grade: Grade;

    @ManyToOne(() => Cycle, (cycle) => cycle.groups)
    cycle: Cycle;

    @OneToMany(() => Inscription, (inscription) => inscription.group)
    inscriptions: Inscription[];

    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.group)
    studyPlan: StudyPlan;

    @ManyToOne(() => StudyPlanVariant, (studyPlanVariant) => studyPlanVariant.groups)
    studyPlanVariant: StudyPlanVariant;

    @OneToMany(() => Assignment, (assignment) => assignment.group)
    assignments: Assignment[];
}
