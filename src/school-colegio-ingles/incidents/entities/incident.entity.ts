import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Classroom } from '../../classrooms/entities/classroom.entity';
import { IncidentClassification } from '../../incident-classification/entities/incident-classification.entity';

@Entity()
export class Incident {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

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

    @ManyToOne(() => IncidentClassification, (incidentClassification) => incidentClassification.incidents)
    incidentClassification: IncidentClassification[];
}
