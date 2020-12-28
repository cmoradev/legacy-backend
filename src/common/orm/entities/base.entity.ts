import {
    Column, CreateDateColumn,
    Entity, Generated,
    PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { DateTimeZoneTransformer } from './transformers/date-time-zone.transformer';

export class Base {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @CreateDateColumn({
        type: 'timestamp',
       // transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
       // transformer: new DateTimeZoneTransformer(),
    })
    updatedAt: Date;

    @VersionColumn({
        default: 0,
        nullable: false,
    })
    version: number;

    @Column()
    @Generated('uuid')
    uuid: string;

}
