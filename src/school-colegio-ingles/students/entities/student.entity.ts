import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Inscription } from '../../inscriptions/entities/inscription.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { Family } from '../../families/entities/family.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { AcademiesModality } from '../../../academy/academy-modalities/entities/academy-modality.entity';
import { TypeStudent } from '../interface/studentsSchool.interface';
import { AcademyInscription } from '../../../academy/academy-inscription/entities/academy-inscription.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { SchoolCharge } from '../../charges-school/school-charges/entities/school-charge.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { StudentInscriptionStatus } from '../../../common/enums/PaymentStatus';

@ObjectType()
@Entity('alumnos')
export class Student extends Base {

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'matricula',
    })
    matricula: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 60,
        name: 'nombre',
    })
    name: string;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'ap_paterno',
    })
    lastNameFather: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'ap_materno',
    })
    lastNameMother: string | null;

    @Field(type => Int,{ nullable: true })
    @Column('int', {
        nullable: true,
        name: 'edad',
    })
    age: number | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'sexo',
    })
    gender: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'direccion',
    })
    address: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 10,
        name: 'tipo_sangre',
    })
    bloodType: string | null;

    @Field({ nullable: true })
    @Column('date', {
        nullable: true,
        name: 'fech_nac',
    })
    birthdate: string | null;

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 60,
        name: 'curp',
    })
    curp: string | null;

    @Field({ nullable: false })
    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'name_search',
    })
    searchName: string;


    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_familia',
    })
    idFamily: number;

    @Field()
    @Column({
        type: 'simple-enum',
        nullable: false,
        name: 'id_modalidad',
        enum: TypeStudent,
        default: TypeStudent.student,
    })
    typeStudent: TypeStudent;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_plantel',
    })
    idCampus: number;

    @Field({ nullable: true })
    @Column('text', {
        nullable: true,
        name: 'profile_picture',
    })
    profilePicture: string | null;

    @Field(type => BranchOffice)
    @ManyToOne(() => BranchOffice, (campus) => campus.students)
    studentCampus: BranchOffice;

    @Field(type => AcademiesModality)
    @ManyToOne(() => AcademiesModality, (academiesModality) => academiesModality.students)
    academiesModality: AcademiesModality;

    @Field(type => Family)
    @ManyToOne(() => Family, (family) => family.students, {
        cascade: ['insert', 'update'],
    })
    family: Family;

    @Field(type => [Inscription])
    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudent)
    studentInscriptions: Inscription[];

    @Field(type => [Incident])
    @OneToMany(() => Incident, (incident) => incident.student)
    incidents: Incident[];

    @Field(type => [AcademyInscription])
    @OneToMany(() => AcademyInscription, (inscription) => inscription.student)
    studentAcInscriptions: AcademyInscription[];

    @Field(type => [MiniStoreSale])
    @OneToMany(type => MiniStoreSale, sale => sale.student)
    sales: MiniStoreSale[];

    @Field(type => [SchoolCharge])
    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.schoolStudent)
    studentCharges: SchoolCharge[];

    @Field(type => [AcademyCharge])
    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.schoolStudent)
    academyCharges: AcademyCharge[];

    @Field()
    @Column('simple-enum', {
        enum: StudentInscriptionStatus,
        default: StudentInscriptionStatus.activated,
        nullable: false,
    })
    statusStudentInscription: StudentInscriptionStatus;
}
