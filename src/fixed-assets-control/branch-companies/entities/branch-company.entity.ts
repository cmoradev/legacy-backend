import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { MatrixCompany } from '../../matrix-companies/entities/matrix-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class BranchCompany extends Base {

    @Field()
    @Column()
    name: string;

    @Field(type => MatrixCompany)
    @ManyToOne(type => MatrixCompany, matrix => matrix.branches)
    matrixCompany: MatrixCompany;

    @Field(type => [Employee])
    @ManyToMany(type => Employee, employee => employee.branchCompanies)
    @JoinTable()
    employees: Employee[];

    @Field(type => [JobPosition])
    @OneToMany(type => JobPosition, jobPosition => jobPosition.branchCompany)
    jobPositions: JobPosition[];

    @Field(type => [FixedAsset])
    @OneToMany(type => FixedAsset, fixedAsset => fixedAsset.branchCompany)
    fixedAssets: FixedAsset[];

    @Field(type => [ResponsiveLetter])
    @OneToMany(type => ResponsiveLetter, responsiveLetter => responsiveLetter.branchCompany)
    responsiveLetters: ResponsiveLetter[];

}
