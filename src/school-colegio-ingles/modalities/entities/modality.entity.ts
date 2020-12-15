import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Modality extends Base {

  @Column()
  name: string;

  @OneToMany(type => StudyPlan, studyPlan => studyPlan.modality)
  studyPlans: StudyPlan[];

}
