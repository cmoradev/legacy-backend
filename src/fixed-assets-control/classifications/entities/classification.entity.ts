import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FixedAsset } from '../../fixed-assets/entities/fixed-asset.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Classification extends Base {

    @Field()
    @Column()
    description: string;

    @Field(type => [FixedAsset])
    @OneToMany(type => FixedAsset, fixedAsset => fixedAsset.classification)
    fixedAssets: FixedAsset[];

}
