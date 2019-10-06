import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { MatrixCompany } from '../../matrix-companies/entities/matrix-company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';

@Entity()
export class BranchCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => MatrixCompany, matrix => matrix.branches)
    matrixCompany: MatrixCompany;

    @ManyToMany(type => Employee, employee => employee.branchCompanies)
    @JoinTable()
    employees: Employee[];

    @OneToMany(type => JobPosition, jobPosition => jobPosition.branchCompany)
    jobPositions: JobPosition[];

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
