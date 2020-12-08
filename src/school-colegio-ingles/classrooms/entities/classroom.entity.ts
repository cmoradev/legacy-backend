import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from '../../grades/entities/grade.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { StudyPlan } from '../../study-plans/entities/study-plan.entity';
import { StudyPlanVariant } from '../../study-plan-variants/entities/study-plan-variants.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Group } from '../../groups/entities/group.entity';
import { Level } from '../../levels/entities/level.entity';
import { ClassroomPermission } from '../../classroom-permission/entities/classroom-permission.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Classroom extends Base {

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

    @ManyToOne(() => Grade, (grade) => grade.classrooms)
    grade: Grade;

    @ManyToOne(() => Cycle, (cycle) => cycle.classrooms)
    cycle: Cycle;

    @OneToMany(() => Inscription, (inscription) => inscription.inscripClassroom)
    classroomInscriptions: Inscription[];

    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.classrooms)
    studyPlan: StudyPlan;

    @ManyToOne(() => StudyPlanVariant, (studyPlanVariant) => studyPlanVariant.classrooms)
    studyPlanVariant: StudyPlanVariant;

    @OneToMany(() => Assignment, (assignment) => assignment.classroom)
    assignments: Assignment[];

    @ManyToOne(() => Group, (group) => group.groupClassrooms)
    group: Group;

    @ManyToOne(() => Level, (level) => level.classrooms)
    level: Level;
    @OneToMany(() => ClassroomPermission, (classroomPermission) => classroomPermission.classroom)
    classroomPermissions: ClassroomPermission[];
    @OneToMany(() => Incident, (incident) => incident.classroom)
    incidents: Incident[];
}
