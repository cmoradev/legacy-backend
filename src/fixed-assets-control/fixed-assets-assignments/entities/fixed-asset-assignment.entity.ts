import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';

enum AssignmentStatus {
    Assigned = 'Assigned',
    Returned = 'Returned',
    NotReturned = 'NotReturned',
}

@Entity()
export class FixedAssetAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Employee, employee => employee.assignments)
    employee: Employee;

    @ManyToOne(type => FixedAsset, fixedAsset => fixedAsset.assignmentHistory)
    fixedAsset: FixedAsset;

    @Column({
        type: 'enum',
        enum: AssignmentStatus,
        default: AssignmentStatus.Assigned,
        nullable: false,
    })
    status: AssignmentStatus;

    @ManyToOne(type => ResponsiveLetter,
        responsiveLetter => responsiveLetter.fixedAssetAssignments)
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
