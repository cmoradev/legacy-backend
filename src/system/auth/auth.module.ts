import { INestApplication, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { ConfigModule } from '../../config/config.module';
import { JwtStrategy, LocalLoginStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import * as session from 'express-session';
import { ConfigService } from '../../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../departments/entities/department.entity';
import { Role } from '../roles/entities/role.entity';
import { Campus } from '../../school-colegio-ingles/campuses/entities/campus.entity';
import { UsersModule } from '../users/users.module';
// tslint:disable-next-line:no-var-requires
const MySQLStore = require('express-mysql-session')(session);

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        TypeOrmModule.forFeature([Department, Role, Campus], 'colegiodb'),
      JwtModule.registerAsync({
          useClass: JwtConfigService,
          imports: [ConfigModule],
      }),
    ],
    providers: [
        AuthService,
        LocalLoginStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
    constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
    ) {
    }

    public initialize(app: INestApplication) {

        const options = {
            host: this.configService.get<string>('DB_HOST_COLEGIO_INGLES'),
            port: this.configService.get<string>('DB_PORT_COLEGIO_INGLES'),
            user: this.configService.get<string>('DB_USERNAME_COLEGIO_INGLES'),
            password: this.configService.get<string>('DB_PASSWORD_COLEGIO_INGLES'),
            database: this.configService.get<string>('DB_DBNAME_COLEGIO_INGLES'),
        };

        const sessionStore = new MySQLStore(options);

        // 1000 * 60 * 60 * 24
        app.use(session({
            secret: this.configService.get<string>('API_SECRET'),
            store: sessionStore,
            cookie: {
                httpOnly: true,
                expires: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
            resave: false,
            saveUninitialized: false,
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser((user: any, done: (err: any, id?: any) => void) => done(null, user));
        passport.deserializeUser((id: any, done: (err: any, user?: any) => void) => done(null, id));

        passport.use(new LocalLoginStrategy(this.authService));
    }
}
