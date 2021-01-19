import { Entity, ManyToOne } from 'typeorm';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class AssignmentInscription extends Base {

    @Field(type => Inscription)
    @ManyToOne(() => Inscription, (inscription) => inscription.inscripAssignmentsInscription)
    assignmentsInscription: Inscription;

    @Field(type => Inscription)
    @ManyToOne(() => Assignment, (assignment) => assignment.assignmentsInscription)
    assignment: Assignment;
}
