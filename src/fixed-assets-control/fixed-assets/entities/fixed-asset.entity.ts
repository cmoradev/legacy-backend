import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Classification } from '../../classifications/entities/classification.entity';
import { Location } from '../../locations/entities/location.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export enum FixedAssetStatus {
    Available = 'Available',
    Assigned = 'Assigned',
    NotAvailable = 'NotAvailable',
}

@ObjectType()
@Entity()
export class FixedAsset extends Base {
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    model: string;

    @Field()
    @Column()
    brand: string;

    @Field()
    @Column()
    serie: string;

    @Field(type => Int)
    @Column({
        type: 'decimal',
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
    })
    purchasePrice: number;

    @Field()
    @Column()
    purchaseDate: Date;

    @Field({ nullable: true })
    @Column({
        nullable: true,
    })
    invoiceUrl: string;

    @Field({ nullable: true })
    @Column({
        nullable: true,
    })
    photoUrl: string;

    @Field()
    @Column({
        type: 'simple-enum',
        enum: FixedAssetStatus,
        default: FixedAssetStatus.Available,
        nullable: false,
    })
    status: FixedAssetStatus;

    @Field(type => BranchCompany, { nullable: false })
    @ManyToOne(type => BranchCompany, branchCompany => branchCompany.fixedAssets,
      { nullable: false },
    )
    branchCompany: BranchCompany;

    @Field(type => [FixedAssetAssignment])
    @OneToMany(type => FixedAssetAssignment, assignment => assignment.fixedAsset)
    assignmentHistory: FixedAssetAssignment[];

    @Field(type => Classification)
    @ManyToOne(type => Classification, classification => classification.fixedAssets)
    classification: Classification;

    @Field(type => Location, { nullable: true })
    @ManyToOne(type => Location, location => location.fixedAssets,
      {
          nullable: true,
      })
    location: Location;
}
