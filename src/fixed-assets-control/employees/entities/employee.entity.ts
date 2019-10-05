import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(type => BranchCompany, branchCompany => branchCompany.employees)
    branchCompanies: BranchCompany[];

    @ManyToMany(type => JobPosition, jobPosition => jobPosition.employees)
    jobPositions: JobPosition[];
}
