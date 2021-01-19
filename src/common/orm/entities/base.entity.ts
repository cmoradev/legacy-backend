import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Field, ID } from '@nestjs/graphql';

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
