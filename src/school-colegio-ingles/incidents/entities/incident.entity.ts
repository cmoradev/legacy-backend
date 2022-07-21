import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { IncidentClassification } from '../../incident-classification/entities/incident-classification.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Incident extends Base {

    @Column({
        type: 'varchar',
    })
    subject: string;

    @Column({
        type: 'varchar',
    })
    description: string;

    @ManyToOne(() => Student, (student) => student.incidents)
    student: Student;

    @ManyToOne(() => Teacher, (teacher) => teacher.incidents)
    teacher: Teacher;

    @ManyToOne(() => Classroom, (classroom) => classroom.incidents)
    classroom: Classroom;

    @ManyToOne(() => IncidentClassification, (incidentClassification) => incidentClassification.incidents)
    incidentClassification: IncidentClassification[];
}
