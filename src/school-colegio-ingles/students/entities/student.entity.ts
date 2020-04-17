import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { Campus } from '../../campuses/entities/campus.entity';
import { Family } from '../../families/entities/family.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { AcademiesModality } from '../../../academy/academy-modalities/entities/academy-modality.entity';
import { TypeStudent } from '../interface/studentsSchool.interface';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { SchoolCharge } from '../../charges-school/school-charges/entities/school-charge.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';

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

    @Column({
        type: 'enum',
        nullable: false,
        name: 'id_modalidad',
        enum: TypeStudent,
        default: TypeStudent.student,
    })
    typeStudent: TypeStudent;

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
    studentCampus: Campus;

    @ManyToOne(() => AcademiesModality, (academiesModality) => academiesModality.students)
    academiesModality: AcademiesModality;

    @ManyToOne(() => Family, (family) => family.students)
    family: Family;

    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudent)
    studentInscriptions: Inscription[];

    @OneToMany(() => Incident, (incident) => incident.student)
    incidents: Incident[];

    @OneToMany(() => AcademyInscription, (inscription) => inscription.acInsStudent)
    studentAcInscriptions: AcademyInscription[];

    @OneToMany(type => MiniStoreSale, sale => sale.student)
    sales: MiniStoreSale[];

    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.schoolStudent)
    studentCharges: SchoolCharge[];

    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.schoolStudent)
    academyCharges: AcademyCharge[];
}
