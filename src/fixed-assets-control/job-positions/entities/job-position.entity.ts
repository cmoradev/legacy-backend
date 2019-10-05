import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../../school-colegio-ingles/departments/entities/department.entity';

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

}
