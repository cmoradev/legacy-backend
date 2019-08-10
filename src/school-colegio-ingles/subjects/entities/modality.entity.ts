import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {StudyPlan} from './study-plan.entity';

@Entity()
export class Modality {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;
    @Column()
    name: string;
    @OneToMany(type => StudyPlan, (studyPlan) => studyPlan.modality)
    studyPlans: StudyPlan[];

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
}
