import { Base } from '../../../common/orm/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class AutRvoe extends Base {
  @Column()
  name: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Level, level => level.autRvoe)
  level: Level;

}
