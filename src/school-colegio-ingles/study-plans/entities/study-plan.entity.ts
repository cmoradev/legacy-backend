import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Group } from '../../groups/entities/group.entity';
import { Level } from '../../levels/entities/level.entity';
import { Modality } from '../../modalities/entities/modality.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';

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
    @OneToMany(() => Classroom, (classroom) => classroom.studyPlan)
    classrooms: Classroom[];

    @OneToMany(() => Inscription, (inscription) => inscription.studyPlan)
    inscriptions: Inscription[];

}
