import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Student as Client } from '../../../school-colegio-ingles/students/entities/student.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Company extends Base {

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    name: string;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    businessName: string;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    rfc: string;

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    address: string;

    @Field()
    @Column({
        type: 'text',
        nullable: true,
    })
    logo: string;

    @Field(type => Client)
    @OneToOne(type => Client)
    @JoinColumn()
    defaultClient: Client;


}
