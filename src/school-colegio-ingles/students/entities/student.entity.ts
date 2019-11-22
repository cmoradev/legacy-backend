import {
    Column,
    Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Inscription} from '../../inscriptions/entities/inscription.entity';
import {Campus} from '../../campuses/entities/campus.entity';
import {Family} from '../../families/entities/family.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { AcademiesModality } from '../../../academy/academies-modalities/entities/academies-modality.entity';

@Entity('alumnos')
export class Student {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'matricula',
    })
    matricula: string;

    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'ap_paterno',
    })
    lastNameFather: string | null;

    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'ap_materno',
    })
    lastNameMother: string | null;

    @Column('int', {
        nullable: true,
        name: 'edad',
    })
    age: number | null;

    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'sexo',
    })
    gender: string | null;

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'direccion',
    })
    address: string | null;

    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'tipo_sangre',
    })
    bloodType: string | null;

    @Column('date', {
        nullable: true,
        name: 'fech_nac',
    })
    birthdate: string | null;

    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'curp',
    })
    curp: string | null;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'name_search',
    })
    searchName: string;

    @Column('int', {
        nullable: false,
        name: 'id_familia',
    })
    idFamily: number;

    @Column('int', {
        nullable: false,
        default: () => '\'1\'',
        name: 'id_modalidad',
    })
    idModality: number;

    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @Column('text', {
            nullable: true,
            name: 'profile_picture',
    })
    profilePicture: string | null;

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

    @ManyToOne(() => Campus, (campus) => campus.students)
    campus: Campus;

    @ManyToOne(() => AcademiesModality, (academiesModality) => academiesModality.students )
    academiesModality: AcademiesModality;

    @ManyToOne(() => Family, (family) => family.students)
    family: Family;

    @OneToMany(() => Inscription, (inscription) => inscription.student)
    inscriptions: Inscription[];
    @OneToMany(() => Incident, (incident) => incident.student)
    incidents: Incident[];

}
