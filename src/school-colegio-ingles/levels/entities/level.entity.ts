import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campus } from '../../campuses/entities/campus.entity';
import { Grade } from '../../grades/entities/grade.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';

@Entity('niveles')
export class Level {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'id_plantel',
  })
  idPlantel: number;

  @Column('varchar', {
    nullable: false,
    length: 40,
    name: 'nivel',
  })
  name: string;

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
  @ManyToOne(() => Campus, (campus) => campus.levels)
  campus: Campus;

  @OneToMany(() => Grade, (grade) => grade.level)
  grades: Grade[];

  @OneToMany(() => Inscription, (inscription) => inscription.inscripLevel)
  levelInscriptions: Inscription[];

  @OneToMany(() => StudyPlan, (studyPlan) => studyPlan.level)
  studyPlans: StudyPlan[];

  @OneToMany(() => Classroom, (classroom) => classroom.level)
  classrooms: Classroom[];

}
