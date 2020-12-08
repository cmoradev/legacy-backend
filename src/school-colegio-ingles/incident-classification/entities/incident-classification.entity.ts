import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Incident } from '../../incidents/entities/incident.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class IncidentClassification extends Base {

    @Column({
        type: 'varchar',
    })
    name: string;

    @Column({
        type: 'varchar',
    })
    description: string;

    @OneToMany(() => Incident, (incident) => incident.incidentClassification)
    incidents: Incident[];

}
