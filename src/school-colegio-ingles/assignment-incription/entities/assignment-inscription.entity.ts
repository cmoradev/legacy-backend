import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class AssignmentInscription extends Base {

    @ManyToOne(() => Inscription, (inscription) => inscription.inscripAssignmentsInscription)
    assignmentsInscription: Inscription;

    @ManyToOne(() => Assignment, (assignment) => assignment.assignmentsInscription)
    assignment: Assignment;
}
