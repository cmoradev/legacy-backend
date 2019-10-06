import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../../school-colegio-ingles/departments/entities/department.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';

@Entity()
export class JobPosition {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => BranchCompany, branchCompany => branchCompany.jobPositions)
    branchCompany: BranchCompany;

    @ManyToMany(type => Employee, employee => employee.jobPositions)
    @JoinTable()
    employees: Employee[];

    @ManyToOne(type => Department, department => department.jobPositions)
    department: Department;

    @OneToMany(type => ResponsiveLetter, responsiveLetter => responsiveLetter.jobPosition)
    responsiveLetters: ResponsiveLetter[];

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt?: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt?: Date;

}
