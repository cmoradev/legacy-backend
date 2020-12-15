import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../../system/departments/entities/department.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Location extends Base {

    @Column()
    description: string;

    @ManyToOne(type => Department,
        department => department.locations, {
            nullable: false,
        })
    department: Department;

    @OneToMany(type => FixedAssetAssignment,
        fixedAssetAssignmet => fixedAssetAssignmet.location)
    fixedAssetAssignments: FixedAssetAssignment[];

    @OneToMany(type => FixedAsset,
        fixedAsset => fixedAsset.location)
    fixedAssets: FixedAsset[];

}
