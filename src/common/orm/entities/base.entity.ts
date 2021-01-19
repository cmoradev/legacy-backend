import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType()
export class Base {
    @Field(type => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Field(type => GraphQLISODateTime)
    @CreateDateColumn({
        type: 'timestamp',
        // transformer: new DateTimeZoneTransformer(),
    })
    createdAt: Date;

    @Field(type => GraphQLISODateTime)
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
