import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../../system/departments/entities/department.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class JobPosition extends Base {

    @Field()
    @Column()
    name: string;

    @Field(type => BranchCompany)
    @ManyToOne(type => BranchCompany, branchCompany => branchCompany.jobPositions)
    branchCompany: BranchCompany;

    @Field(type => [Employee])
    @ManyToMany(type => Employee, employee => employee.jobPositions)
    @JoinTable()
    employees: Employee[];

    @Field(type => Department)
    @ManyToOne(type => Department, department => department.jobPositions)
    department: Department;

    @Field(type => [ResponsiveLetter])
    @OneToMany(type => ResponsiveLetter, responsiveLetter => responsiveLetter.jobPosition)
    responsiveLetters: ResponsiveLetter[];

}
