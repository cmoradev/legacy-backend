import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';
import { SystemExtraCharges } from '../../system-extra-charges/entities/system-extra-charges.entity';

export const myTransformer: ValueTransformer = {

    to(value: string): string {
        return value;
    },
    from(value: string): string[] {
        return value.split(',');
    },

};

export enum SystemTypeExtraChargesEnum {
    Descuentos = 1,
    Recargos = 2,
    Becas = 3,
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
        transformer: myTransformer,
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
