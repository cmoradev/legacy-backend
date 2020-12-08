import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Employee extends Base {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    badgeNumber: string;

    @ManyToMany(type => BranchCompany, branchCompany => branchCompany.employees)
    branchCompanies: BranchCompany[];

    @ManyToMany(type => JobPosition, jobPosition => jobPosition.employees)
    jobPositions: JobPosition[];

    @OneToMany(type => FixedAssetAssignment, assignment => assignment.employee)
    assignments: FixedAssetAssignment[];

    @OneToMany(type => ResponsiveLetter,
        responsiveLetter => responsiveLetter.employee)
    responsiveLetters: ResponsiveLetter[];

}
