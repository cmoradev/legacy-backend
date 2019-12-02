import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';

@Entity()
export class AssignmentInscription {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ManyToOne(() => Inscription, (inscription) => inscription.inscripAssignmentsInscription)
    assignmentsInscription: Inscription;

    @ManyToOne(() => Assignment, (assignment) => assignment.assignmentsInscription)
    assignment: Assignment;

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
