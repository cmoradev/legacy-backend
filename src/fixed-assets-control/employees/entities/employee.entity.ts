import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Employee extends Base {
    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    badgeNumber: string;

    @Field(type => [BranchCompany])
    @ManyToMany(type => BranchCompany, branchCompany => branchCompany.employees)
    branchCompanies: BranchCompany[];

    @Field(type => [JobPosition])
    @ManyToMany(type => JobPosition, jobPosition => jobPosition.employees)
    jobPositions: JobPosition[];

    @Field(type => [FixedAssetAssignment])
    @OneToMany(type => FixedAssetAssignment, assignment => assignment.employee)
    assignments: FixedAssetAssignment[];

    @Field(type => [ResponsiveLetter])
    @OneToMany(type => ResponsiveLetter,
        responsiveLetter => responsiveLetter.employee)
    responsiveLetters: ResponsiveLetter[];

}
