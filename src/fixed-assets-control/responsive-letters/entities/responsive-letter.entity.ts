import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { JobPosition } from '../../job-positions/entities/job-position.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';

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
