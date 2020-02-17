import { Column } from 'typeorm';
import { Base } from './base.entity';

export class ProtectedResource extends Base {

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isRemoved: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  removedAt: Date | null;

}
