import { INestApplication, Module } from '@nestjs/common';
import * as session from 'express-session';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../../config/config.module';
import { JwtStrategy, LocalStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../departments/entities/department.entity';
import { Role } from '../roles/entities/role.entity';
import { BranchOffice } from '../branch-office/entities/branch-office.entity';
import { UsersModule } from '../users/users.module';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { SettingsModule } from '../settings/settings.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { AuthAccessTokensModule } from '../auth-access-tokens/auth-access-tokens.module';
import passport from 'passport';
import { ConfigService } from '../../config/config.service';
import { isDesktop } from '../../common/desktop/desktop.config';

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
        TypeOrmModule.forFeature([Department, Role, BranchOffice], ColegioDBNameConnection),
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
    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    public initialize(app: INestApplication) {
        app.use(session({
            secret: isDesktop ? 'API_SECRET' : this.configService.get<string>('API_SECRET'),
            resave: false,
            cookie: {
                httpOnly: isDesktop ? true : !!this.configService.isProduction,
                secure: isDesktop ? true : !!this.configService.isProduction,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
            saveUninitialized: false,
        }));

    }
}
