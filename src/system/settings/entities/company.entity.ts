import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Student as Client } from '../../../school-colegio-ingles/students/entities/student.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity()
export class Company extends Base {

    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    businessName: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    rfc: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
    })
    address: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    logo: string;

    @OneToOne(type => Client)
    @JoinColumn()
    defaultClient: Client;


}
