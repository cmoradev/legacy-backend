import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { IncidentClassification } from '../../incident-classification/entities/incident-classification.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Incident extends Base {

    @Field()
    @Column({
        type: 'varchar',
    })
    subject: string;

    @Field()
    @Column({
        type: 'varchar',
    })
    description: string;

    @Field(type => Student)
    @ManyToOne(() => Student, (student) => student.incidents)
    student: Student;

    @Field(type => Teacher)
    @ManyToOne(() => Teacher, (teacher) => teacher.incidents)
    teacher: Teacher;

    @Field(type => Classroom)
    @ManyToOne(() => Classroom, (classroom) => classroom.incidents)
    classroom: Classroom;

    @Field(type => [IncidentClassification])
    @ManyToOne(() => IncidentClassification, (incidentClassification) => incidentClassification.incidents)
    incidentClassification: IncidentClassification[];
}
