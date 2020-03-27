import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { Student as Client } from '../../../school-colegio-ingles/students/entities/student.entity';

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
    })
    logo: string;

    @OneToOne(type => Client)
    @JoinColumn()
    defaultClient: Client;

    @Column()
    @Generated('uuid')
    uuid: string;

    @VersionColumn()
    version: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
