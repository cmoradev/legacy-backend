import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('facturacion_unidades')
export class FacturacionUnidades {

    @Field(type => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;


    @Field()
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'nombre',
    })
    nombre: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 4,
        name: 'codigo',
    })
    codigo: string;


    @Field()
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Field()
    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

}
