import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId, ValueTransformer,
} from 'typeorm';
import { AcademyActivitiesGroup } from '../../../academy/academy-activities-group/entities/academy-activities-group.entity';
import { SystemExtraCharges } from '../../system-extra-charges/entities/system-extra-charges.entity';

class TransformerInArray implements ValueTransformer {

    to(value: string): string {
        return value;
    }
    from(value: string): string[] {
        return value.split(',');
    }

}

@Entity('ac_tipo_descuento')
export class SystemTypeExtraCharges {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'operations',
        transformer: new TransformerInArray(),
    })
    operations: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @OneToMany(() => SystemExtraCharges, (systemExtraCharges) => systemExtraCharges.extraChargesType)
    systemTyExCharCharge: SystemExtraCharges[];

}
