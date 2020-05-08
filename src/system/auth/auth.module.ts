import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../../config/config.module';
import { JwtStrategy, LocalStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../departments/entities/department.entity';
import { Role } from '../roles/entities/role.entity';
import { Campus } from '../../school-colegio-ingles/campuses/entities/campus.entity';
import { UsersModule } from '../users/users.module';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { SettingsModule } from '../settings/settings.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { AuthAccessTokensModule } from '../auth-access-tokens/auth-access-tokens.module';

@Module({
    imports: [
        UsersModule,
        SettingsModule,
        ConfigModule,
        AuthAccessTokensModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            useClass: JwtConfigService,
            imports: [ConfigModule],
        }),
        TypeOrmModule.forFeature([Department, Role, Campus], ColegioDBNameConnection),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        PassportModule,
        LocalStrategy,
        JwtStrategy,
        AuthService,
    ],
    controllers: [AuthController],
})
export class AuthModule {
}
