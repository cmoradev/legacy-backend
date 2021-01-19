import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { MatrixCompany } from '../../matrix-companies/entities/matrix-company.entity';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ResponsiveLetter extends Base {

    @Field()
    @Column({
        nullable: false,
    })
    expeditionDate: Date;

    @Field()
    @Column()
    signatureUrl: string;

    @Field(type => MatrixCompany)
    @ManyToOne(type => MatrixCompany, matrixCompany => matrixCompany.responsiveLetters,
        {
            nullable: false,
        })
    matrixCompany: MatrixCompany;

    @Field(type => BranchCompany)
    @ManyToOne(type => BranchCompany, branchCompany => branchCompany.responsiveLetters,
        {
            nullable: false,
        })
    branchCompany: BranchCompany;

    @Field(type => JobPosition)
    @ManyToOne(type => JobPosition, jobPosition => jobPosition.responsiveLetters)
    jobPosition: JobPosition;

    @Field(type => Employee)
    @ManyToOne(type => Employee, employee => employee.responsiveLetters)
    employee: Employee;

    @Field(type => [FixedAssetAssignment])
    @OneToMany(type => FixedAssetAssignment,
        fixedAssetAssignment => fixedAssetAssignment.responsiveLetter)
    fixedAssetAssignments: FixedAssetAssignment[];

}
