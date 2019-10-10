import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';

@Entity()
export class Classification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @OneToMany(type => FixedAsset, fixedAsset => fixedAsset.classification)
    fixedAssets: FixedAsset[];
}
