import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Classification extends Base {

    @Column()
    description: string;

    @OneToMany(type => FixedAsset, fixedAsset => fixedAsset.classification)
    fixedAssets: FixedAsset[];

}
