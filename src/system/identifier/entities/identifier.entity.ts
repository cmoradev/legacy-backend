import { TypeIdentifier } from '../../../common/enums/TypeIdentifier.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';

@Entity('identifier')
export class Identifier extends Base {

    @Column('varchar', {
        nullable: false,
    })
    identifier: string;

    @Column({
        type: 'simple-enum',
        enum: TypeIdentifier,
        nullable: false,
    })
    type: TypeIdentifier;

    @ManyToOne(() => Student, (student) => student.identifiers, {
        cascade: ['insert', 'update'], nullable: false
    })
    student: Student;
}
