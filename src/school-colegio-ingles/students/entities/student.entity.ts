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
import { StudentInscriptionStatus } from '../../../common/enums/PaymentStatus';
import { Transaction } from '../../../system/transaction/entities/transaction.entity';

@Entity('alumnos')
export class Student extends Base {
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

    @Column('varchar', {nullable: false,})
    email: string;

    @Column('boolean', {nullable: false,})
    notify: boolean;

    @Column({
        type: 'simple-enum',
        nullable: false,
        name: 'id_modalidad',
        enum: TypeStudent,
        default: TypeStudent.student,
    })
    typeStudent: TypeStudent;

    @Column('text', {
        nullable: true,
        name: 'profile_picture',
    })
    profilePicture: string | null;

    @Column('int', {
        nullable: true,
        default: 0
    })
    saldo: number;

    @ManyToOne(() => BranchOffice, (campus) => campus.students)
    studentCampus: BranchOffice;

    @ManyToOne(() => AcademiesModality, (academiesModality) => academiesModality.students)
    academiesModality: AcademiesModality;

    @ManyToOne(() => Family, (family) => family.students, {
        cascade: ['insert', 'update'],
    })
    family: Family;

    @OneToMany(() => Inscription, (inscription) => inscription.inscripStudent)
    studentInscriptions: Inscription[];

    @OneToMany(() => Incident, (incident) => incident.student)
    incidents: Incident[];

    @OneToMany(() => AcademyInscription, (inscription) => inscription.student)
    studentAcInscriptions: AcademyInscription[];

    @OneToMany(type => MiniStoreSale, sale => sale.student)
    sales: MiniStoreSale[];

    @OneToMany(() => SchoolCharge, (schoolCharge) => schoolCharge.schoolStudent)
    studentCharges: SchoolCharge[];

    @OneToMany(() => AcademyCharge, (academyCharge) => academyCharge.schoolStudent)
    academyCharges: AcademyCharge[];

    @Column('simple-enum', {
        enum: StudentInscriptionStatus,
        default: StudentInscriptionStatus.activated,
        nullable: false,
        name: 'statusStudentInscription'
    })
    statusStudent: StudentInscriptionStatus;

    @OneToMany(() => Transaction, (transaction) => transaction.student)
    transactions: Transaction[];

    @OneToMany(type => MiniStoreSale, identifier => identifier.student)
    identifiers: MiniStoreSale[];
}
