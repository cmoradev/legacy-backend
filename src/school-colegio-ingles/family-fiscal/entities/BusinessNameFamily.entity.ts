import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from '../../families/entities/family.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('familia_infofiscal')
export class BusinessNameFamily extends Base{

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'familia',
    })
    familyName: string | null;

    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'razon_social',
    })
    businessName: string;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'rfc',
    })
    rfc: string;

    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'correo',
    })
    email: string;

    @Column('int', {
        nullable: true,
        name: 'id_regimen',
    })
    idRegimen: number;

    @ManyToOne(() => Family, (family) => family.businessName)
    @JoinColumn({
        name: 'id_familia',
        referencedColumnName: 'id',
    })
    family: Family;

}
