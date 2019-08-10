import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { AssignmentSubject } from './assignment-subject.entity';

@Entity()
export class Subject {

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 45,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 45,
  })
  shortName: string;

  @Column('int', {
    nullable: true,
  })
  credits: number | null;

  @ManyToMany(() => StudyPlanVariant, studyPlanVariant => studyPlanVariant.subjects)
  studyPlansVariant: StudyPlanVariant[];

  @OneToMany(() => AssignmentSubject, (assignmentSubject) => assignmentSubject.subject)
  assignmentsSubjects: AssignmentSubject[];

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
