import { Column, Entity } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity('ac_cobro_forma_pago')
export class AcademyChargeWayOfPaying extends Base {

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_forma_pago',
    })
    idFormaPago: number;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'codigo_forma_pago',
    })
    codigoFormaPago: string;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        name: 'nombre_forma_pago',
    })
    nombreFormaPago: string | null;

    @Field(type => Int)
    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cantidad',
    })
    cantidad: number;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_banco',
    })
    idBanco: number;

    @Field()
    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'banco',
    })
    banco: string | null;

    @Field()
    @Column('date', {
        nullable: true,
        name: 'fecha',
    })
    fecha: string | null;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 90,
        name: 'cuenta',
    })
    cuenta: string;

    @Field(type => Int)
    @Column('int', {
        nullable: false,
        name: 'id_ac_cobro',
    })
    idAcCobro: number;

}
