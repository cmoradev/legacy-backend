import { Column, Entity, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class MatrixCompany extends Base {

    @Column()
    name: string;

    @OneToMany(type => BranchCompany, branch => branch.matrixCompany)
    branches: BranchCompany[];

    @OneToMany(type => ResponsiveLetter, responsiveLetter => responsiveLetter.matrixCompany)
    responsiveLetters: ResponsiveLetter[];

}
