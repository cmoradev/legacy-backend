import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Modality extends Base {

  @Field()
  @Column()
  name: string;

  @Field(type => [StudyPlan])
  @OneToMany(type => StudyPlan, studyPlan => studyPlan.modality)
  studyPlans: StudyPlan[];

}
