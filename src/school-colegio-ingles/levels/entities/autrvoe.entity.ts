import { Base } from '../../../common/orm/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Level } from './level.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class AutRvoe extends Base {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isActive: boolean;

  @Field(type => Level)
  @ManyToOne(() => Level, level => level.autRvoe)
  level: Level;

}
