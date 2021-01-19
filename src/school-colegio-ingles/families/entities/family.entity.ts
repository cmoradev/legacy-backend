import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Student } from '../../students/entities/student.entity';
import { BusinessNameFamily } from '../../family-fiscal/entities/BusinessNameFamily.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('familias')
export class Family  extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 70,
        name: 'familia',
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'ap_paterno',
    })
    lastNameFather: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'ap_materno',
    })
    lastNameMother: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'activo',
    })
    isActive: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.families)
    campus: BranchOffice;

    @Field(type => [Student])
    @OneToMany(() => Student, (student) => student.family)
    students: Student[];

    @Field(type => [BusinessNameFamily])
    @OneToMany(() => BusinessNameFamily, (student) => student.family)
    businessName: BusinessNameFamily[];
}
