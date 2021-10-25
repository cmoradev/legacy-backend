import { Column, CreateDateColumn, DeleteDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { DateTimeZoneTransformer } from './transformers/date-time-zone.transformer';

@ObjectType()
export class Base {
    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Field(() => GraphQLISODateTime)
    @CreateDateColumn({
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    @UpdateDateColumn({
        type: 'timestamp',
        transformer: new DateTimeZoneTransformer(),
    })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

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
