import { Column, Entity, ManyToOne } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { ResponsiveLetter } from '../../responsive-letters/entities/responsive-letter.entity';
import { Location } from '../../locations/entities/location.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

export enum FixedAssetAssignmentStatus {
    Assigned = 'Assigned',
    Returned = 'Returned',
    NotReturned = 'NotReturned',
}

@ObjectType()
@Entity()
export class FixedAssetAssignment extends Base {


    @Field(type => Employee)
    @ManyToOne(type => Employee, employee => employee.assignments, {
        nullable: false,
    })
    employee: Employee;

    @Field(type => FixedAsset)
    @ManyToOne(type => FixedAsset, fixedAsset => fixedAsset.assignmentHistory,
        {
            nullable: false,
        })
    fixedAsset: FixedAsset;

    @Field()
    @Column({
        type: 'simple-enum',
        enum: FixedAssetAssignmentStatus,
        default: FixedAssetAssignmentStatus.Assigned,
        nullable: false,
    })
    status: FixedAssetAssignmentStatus;

    @Field(type => ResponsiveLetter)
    @ManyToOne(type => ResponsiveLetter,
        responsiveLetter => responsiveLetter.fixedAssetAssignments, {
            nullable: false,
        })
    responsiveLetter: ResponsiveLetter;

    @Field(type => Location)
    @ManyToOne(type => Location,
        location => location.fixedAssetAssignments, {
            nullable: false,
        })
    location: Location;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    dateOfDelivery?: Date;

}
