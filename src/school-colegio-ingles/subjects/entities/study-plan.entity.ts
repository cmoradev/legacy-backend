import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {StudyPlanVariant} from './study-plan-variants.entity';
import {Modality} from './modality.entity';
import {Assignment} from './assignment.entity';
import {Group} from './group.entity';
import {Level} from './level.entity';

@Entity()
export class StudyPlan {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column('varchar', {
        nullable: false,
    })
    status: string;

    @OneToMany(() => Group, (group) => group.studyPlan)
    group: Group;

    @OneToMany(type => StudyPlanVariant, (studyPlanVariants) => studyPlanVariants.studyPlan)
    studyPlansVariants: StudyPlanVariant[];

    @ManyToOne(type => Modality, (modality) => modality.studyPlans)
    modality: Modality;

    @OneToMany(type => Assignment, (assignment) => assignment.studyPlan)
    assignment: Assignment;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: string;

    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    endDate: string | null;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => Level, (level) => level.studyPlans)
    level: Level;
}
