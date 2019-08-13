import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Campus} from '../../campuses/entities/campus.entity';
import {Student} from '../../students/entities/student.entity';

@Entity('familias' )
export class Family {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

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

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @ManyToOne(() => Campus, (campus) => campus.families)
    campus: Campus;

    @OneToMany(() => Student, (student) => student.family)
    students: Student[];

}
