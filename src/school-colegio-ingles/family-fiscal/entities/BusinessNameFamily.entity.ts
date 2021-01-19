import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from '../../families/entities/family.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('familia_infofiscal')
export class BusinessNameFamily extends Base{

    @Field({ nullable: true })
    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'familia',
    })
    familyName: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 200,
        name: 'razon_social',
    })
    businessName: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'rfc',
    })
    rfc: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'correo',
    })
    email: string;

    @Field(type => Int)
    @Column('int', {
        nullable: true,
        name: 'id_regimen',
    })
    idRegimen: number;

    @Field(type => Family)
    @ManyToOne(() => Family, (family) => family.businessName)
    @JoinColumn({
        name: 'id_familia',
        referencedColumnName: 'id',
    })
    family: Family;

}
