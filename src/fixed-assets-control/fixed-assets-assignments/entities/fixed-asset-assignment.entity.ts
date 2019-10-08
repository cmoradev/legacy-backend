import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';

export enum FixedAssetAssignmentStatus {
    Assigned = 'Assigned',
    Returned = 'Returned',
    NotReturned = 'NotReturned',
}

@Entity()
export class FixedAssetAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Employee, employee => employee.assignments, {
        nullable: false,
    })
    employee: Employee;

    @ManyToOne(type => FixedAsset, fixedAsset => fixedAsset.assignmentHistory,
        {
            nullable: false,
        })
    fixedAsset: FixedAsset;

    @Column({
        type: 'enum',
        enum: FixedAssetAssignmentStatus,
        default: FixedAssetAssignmentStatus.Assigned,
        nullable: false,
    })
    status: FixedAssetAssignmentStatus;

    @ManyToOne(type => ResponsiveLetter,
        responsiveLetter => responsiveLetter.fixedAssetAssignments, {
            nullable: false,
        })
    responsiveLetter: ResponsiveLetter;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    dateOfDelivery?: Date;

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
