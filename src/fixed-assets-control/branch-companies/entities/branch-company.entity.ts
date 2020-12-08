import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { MatrixCompany } from '../../matrix-companies/entities/matrix-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class BranchCompany extends Base {

    @Column()
    name: string;

    @ManyToOne(type => MatrixCompany, matrix => matrix.branches)
    matrixCompany: MatrixCompany;

    @ManyToMany(type => Employee, employee => employee.branchCompanies)
    @JoinTable()
    employees: Employee[];

    @OneToMany(type => JobPosition, jobPosition => jobPosition.branchCompany)
    jobPositions: JobPosition[];

    @OneToMany(type => FixedAsset, fixedAsset => fixedAsset.branchCompany)
    fixedAssets: FixedAsset[];

    @OneToMany(type => ResponsiveLetter, responsiveLetter => responsiveLetter.branchCompany)
    responsiveLetters: ResponsiveLetter[];

}
