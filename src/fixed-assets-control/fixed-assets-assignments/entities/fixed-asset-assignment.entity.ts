import { Column, Entity, ManyToOne } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Location } from '../../locations/entities/location.entity';
import { Base } from '../../../common/orm/entities/base.entity';

export enum FixedAssetAssignmentStatus {
    Assigned = 'Assigned',
    Returned = 'Returned',
    NotReturned = 'NotReturned',
}

@Entity()
export class FixedAssetAssignment extends Base {


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
        type: 'simple-enum',
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

    @ManyToOne(type => Location,
        location => location.fixedAssetAssignments, {
            nullable: false,
        })
    location: Location;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    dateOfDelivery?: Date;

}
