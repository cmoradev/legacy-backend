import { Column, Entity, OneToMany } from 'typeorm';
import { Student } from '../../../school-colegio-ingles/students/entities/student.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ac_modalidades')
export class AcademiesModality  extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'nombre',
    })
    name: string;

    @Field(type => [Student])
    @OneToMany(() => Student, (student) => student.academiesModality)
    students: Student[];

}
