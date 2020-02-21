import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';

@Entity()
export class Periods extends Base {
    @Column('varchar', {
        nullable: false,
    })
    name: string;

    @Column('varchar', {
        nullable: true,
        length: 300,
    })
    description: string;

    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: Date;

    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    endDate: Date;

    @ManyToOne(() => Cycle, (cycle) => cycle.cyclePeridos)
    periodsCycle: Cycle;

}
