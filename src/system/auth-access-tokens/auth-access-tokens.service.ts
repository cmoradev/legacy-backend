import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AuthAccessTokensEntity } from './entities/auth-access-tokens.entity';

@Injectable()
export class AuthAccessTokensService extends TypeOrmCrudService<AuthAccessTokensEntity> {
    constructor(
        @InjectRepository(AuthAccessTokensEntity, ColegioDBNameConnection) readonly repo: Repository<AuthAccessTokensEntity>,
    ) {
        super(repo);
    }

    async saveToken(data: Partial<AuthAccessTokensEntity>) {
        console.log('token guardado');
        let token = new AuthAccessTokensEntity();
        token = { ...data } as AuthAccessTokensEntity;
        return await this.repo.save(token);
    }

    async findToken(token: string) {
        const tokenFound = await this.repo.findOne({
            where: {
                jwt: token,
            },
        });
        return tokenFound;
    }

}
