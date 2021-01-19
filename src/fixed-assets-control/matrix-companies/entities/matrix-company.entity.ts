import { Column, Entity, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class MatrixCompany extends Base {

    @Field()
    @Column()
    name: string;

    @Field(type => [BranchCompany])
    @OneToMany(type => BranchCompany, branch => branch.matrixCompany)
    branches: BranchCompany[];

    @Field(type => [ResponsiveLetter])
    @OneToMany(type => ResponsiveLetter, responsiveLetter => responsiveLetter.matrixCompany)
    responsiveLetters: ResponsiveLetter[];

}
