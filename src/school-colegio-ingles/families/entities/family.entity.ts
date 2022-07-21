import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Student } from '../../students/entities/student.entity';
import { BusinessNameFamily } from '../../family-fiscal/entities/BusinessNameFamily.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('familias')
export class Family  extends Base {

    @Column('varchar', {
        nullable: false,
        length: 70,
        name: 'familia',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'ap_paterno',
    })
    lastNameFather: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'ap_materno',
    })
    lastNameMother: string;

    @Column('int', {
        nullable: false,
        name: 'activo',
    })
    isActive: number;

    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @ManyToOne(() => BranchOffice, (campus) => campus.families)
    campus: BranchOffice;

    @OneToMany(() => Student, (student) => student.family)
    students: Student[];

    @OneToMany(() => BusinessNameFamily, (student) => student.family, {
        cascade: ['insert', 'update'],
    })
    businessName: BusinessNameFamily[];
}
