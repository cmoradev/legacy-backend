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
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Classroom extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'grupo',
    })
    name: string;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'min',
    })
    min: number | null;

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'max',
    })
    max: number | null;

    @Field(type => Grade)
    @ManyToOne(() => Grade, (grade) => grade.classrooms)
    grade: Grade;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.classrooms)
    cycle: Cycle;

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripClassroom)
    classroomInscriptions: Inscription[];

    @Field(type => StudyPlan)
    @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.classrooms)
    studyPlan: StudyPlan;

    @Field(type => StudyPlanVariant)
    @ManyToOne(() => StudyPlanVariant, (studyPlanVariant) => studyPlanVariant.classrooms)
    studyPlanVariant: StudyPlanVariant;

    @Field(type => [Assignment])
    @OneToMany(() => Assignment, (assignment) => assignment.classroom)
    assignments: Assignment[];

    @Field(type => Group)
    @ManyToOne(() => Group, (group) => group.groupClassrooms)
    group: Group;

    @Field(type => Level)
    @ManyToOne(() => Level, (level) => level.classrooms)
    level: Level;

    @Field(type => [ClassroomPermission])
    @OneToMany(() => ClassroomPermission, (classroomPermission) => classroomPermission.classroom)
    classroomPermissions: ClassroomPermission[];

    @Field(type => [Incident])
    @OneToMany(() => Incident, (incident) => incident.classroom)
    incidents: Incident[];
}
