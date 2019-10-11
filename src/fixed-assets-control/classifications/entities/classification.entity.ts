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
