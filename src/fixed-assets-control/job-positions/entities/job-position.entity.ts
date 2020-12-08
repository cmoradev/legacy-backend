import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../../system/departments/entities/department.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class JobPosition extends Base {

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

}
