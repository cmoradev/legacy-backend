import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Incident } from '../../incidents/entities/incident.entity';

@Entity()
export class IncidentClassification {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
    })
    name: string;

    @Column({
        type: 'varchar',
    })
    description: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToMany(() => Incident, (incident) => incident.incidentClassification)
    incidents: Incident[];

}
