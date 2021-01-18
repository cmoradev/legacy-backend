import {
    Column, CreateDateColumn,
    Entity, Generated,
    PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { DateTimeZoneTransformer } from './transformers/date-time-zone.transformer';
import { Field, ID, ObjectType } from 'type-graphql';

export class Base {
    @Field(type => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Field()
    @CreateDateColumn({
        type: 'timestamp',
       // transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({
        type: 'timestamp',
       // transformer: new DateTimeZoneTransformer(),
    })
    updatedAt: Date;

    @Field()
    @VersionColumn({
        default: 0,
        nullable: false,
    })
    version: number;

    @Field()
    @Column()
    @Generated('uuid')
    uuid: string;

}
