import { Column, Entity, OneToMany } from 'typeorm';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('ac_modalidades')
export class AcademiesModality  extends Base {

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'nombre',
    })
    name: string;

    @OneToMany(() => Student, (student) => student.academiesModality)
    students: Student[];

}
