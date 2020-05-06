import { Column, Entity } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('oauth_access_tokens')
export class AuthAccessTokensEntity extends Base {

    @Column('int', {
        nullable: true,
        name: 'user_id',
    })
    userId: number | null;

    @Column('int', {
        nullable: false,
        name: 'client_id',
    })
    clientId: number;

    @Column('varchar', {
        nullable: true,
        name: 'name',
    })
    name: string | null;

    @Column('text', {
        nullable: true,
        name: 'scopes',
    })
    scopes: string | null;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'revoked',
    })
    revoked: boolean;

    @Column('tinyint', {
        nullable: false,
        width: 1,
        name: 'refresh',
    })
    refresh: boolean;

    @Column('datetime', {
        nullable: true,
        name: 'expires_at',
    })
    expiresAt: Date | null;

}
