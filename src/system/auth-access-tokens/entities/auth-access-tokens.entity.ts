import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('oauth_access_tokens')
export class AuthAccessTokensEntity extends Base {

    @Field(type => Int, { nullable: true })
    @Column('int', {
        nullable: true,
        name: 'user_id',
    })
    userId: number | null;

    @Field(type => Int, { nullable: false })
    @Column('int', {
        nullable: false,
        name: 'client_id',
    })
    clientId: number;

    @Field()
    @Column('varchar', {
        nullable: true,
        name: 'name',
    })
    name: string | null;

    @Field()
    @Column('text', {
        nullable: true,
        name: 'scopes',
    })
    scopes: string | null;

    @Field(type => Int)
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'revoked',
    })
    revoked: boolean;

    @Field()
    @Column({
        type: 'text',
        nullable: false,
    })
    jwt: string;

    @Field()
    @Column({
        type: 'boolean',
        nullable: false,
    })
    isActive: boolean;

    @Field()
    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'refresh',
    })
    refresh: boolean;

    @Field()
    @Column('datetime', {
        nullable: true,
        name: 'expires_at',
    })
    expiresAt: Date | null;

}
