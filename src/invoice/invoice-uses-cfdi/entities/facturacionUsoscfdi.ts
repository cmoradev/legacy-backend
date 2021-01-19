import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID } from '@nestjs/graphql';


@Entity('facturacion_usoscfdi')
export class FacturacionUsoscfdi {

    @Field(type => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;


    @Field()
    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'codigo',
    })
    codigo: string;


    @Field()
    @Column('varchar', {
        nullable: false,
        name: 'nombre',
    })
    nombre: string;


    @Field()
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Field()
    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date | null;

}
