import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';

@Entity()
export class MatrixCompany {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => BranchCompany, branch => branch.matrixCompany)
    branches: BranchCompany[];
}
