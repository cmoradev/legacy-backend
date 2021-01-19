import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Cycle } from '../../cycles/entities/cycle.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Periods extends Base {
    @Field()
    @Column('varchar', {
        nullable: false,
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: true,
        length: 300,
    })
    description: string;

    @Field({ nullable: true })
    @Column( {
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    startDate: Date;

    @Field({ nullable: true })
    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    endDate: Date;

    @Field()
    @Column('boolean', {
        nullable: false,
        default: true,
    })
    isActive: boolean;

    @Field(type => Cycle)
    @ManyToOne(() => Cycle, (cycle) => cycle.cyclePeridos)
    periodsCycle: Cycle;

}
