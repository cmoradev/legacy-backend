import { Column, Entity, OneToMany } from 'typeorm';
import { Incident } from '../../incidents/entities/incident.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class IncidentClassification extends Base {

    @Field()
    @Column({
        type: 'varchar',
    })
    name: string;

    @Field()
    @Column({
        type: 'varchar',
    })
    description: string;

    @Field(type => [Incident])
    @OneToMany(() => Incident, (incident) => incident.incidentClassification)
    incidents: Incident[];

}
