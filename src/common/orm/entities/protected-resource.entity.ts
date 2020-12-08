import { Column } from 'typeorm';
import { Base } from './base.entity';
import { isDesktop } from '../../desktop/desktop.config';

export class ProtectedResource extends Base {

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isRemoved: boolean;

  @Column({
    type: isDesktop ? 'date':'timestamp',
    nullable: true,
  })
  removedAt: Date | null;

}
