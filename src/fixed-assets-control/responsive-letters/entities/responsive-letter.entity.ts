import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { MatrixCompany } from '../../matrix-companies/entities/matrix-company.entity';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';

@Entity()
export class ResponsiveLetter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    expeditionDate: Date;

    @Column()
    signatureUrl: string;

    @ManyToOne(type => MatrixCompany, matrixCompany => matrixCompany.responsiveLetters,
        {
            nullable: false,
        })
    matrixCompany: MatrixCompany;

    @ManyToOne(type => BranchCompany, branchCompany => branchCompany.responsiveLetters,
        {
            nullable: false,
        })
    branchCompany: BranchCompany;

    @ManyToOne(type => JobPosition, jobPosition => jobPosition.responsiveLetters)
    jobPosition: JobPosition;

    @ManyToOne(type => Employee, employee => employee.responsiveLetters)
    employee: Employee;

    @OneToMany(type => FixedAssetAssignment,
        fixedAssetAssignment => fixedAssetAssignment.responsiveLetter)
    fixedAssetAssignments: FixedAssetAssignment[];

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
