import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../../system/departments/entities/department.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Location extends Base {

    @Field()
    @Column()
    description: string;

    @Field(type => Department)
    @ManyToOne(type => Department,
      department => department.locations, {
          nullable: false,
      })
    department: Department;

    @Field(type => [FixedAssetAssignment])
    @OneToMany(type => FixedAssetAssignment, fixedAssetAssignmet => fixedAssetAssignmet.location)
    fixedAssetAssignments: FixedAssetAssignment[];

    @Field(type => [FixedAsset])
    @OneToMany(type => FixedAsset, fixedAsset => fixedAsset.location)
    fixedAssets: FixedAsset[];

}
