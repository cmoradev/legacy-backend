import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { isDesktop } from '../../../common/desktop/desktop.config';

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

    @Column( {
        type: isDesktop ? 'date': 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: Date;

    @Column({
        type: isDesktop ? 'date': 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    endDate: Date;

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @ManyToOne(() => Cycle, (cycle) => cycle.cyclePeridos)
    periodsCycle: Cycle;

}
