import { Module } from '@nestjs/common';
import { AuthAccessTokensService } from './auth-access-tokens.service';
import { AuthAccessTokensController } from './auth-access-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { AuthAccessTokensEntity } from './entities/auth-access-tokens.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthAccessTokensEntity], ColegioDBNameConnection)],
    exports: [AuthAccessTokensService],
    providers: [AuthAccessTokensService],
    controllers: [AuthAccessTokensController],
})
export class AuthAccessTokensModule {
}
