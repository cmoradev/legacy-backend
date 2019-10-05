import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';

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

    @OneToMany(type => FixedAssetAssignment, assigment => assigment.employee)
    assignments: FixedAssetAssignment[];

    @OneToMany(type => ResponsiveLetter,
        responsiveLetter => responsiveLetter.employee)
    responsiveLetters: ResponsiveLetter[];

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt?: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt?: Date;
}
