import { Injectable } from '@nestjs/common';
import {
    TypeOrmOptionsFactory,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
const processEnv: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
export const ColegioDBNameConnection = 'colegiodb';

@Injectable()
export class ColegioDBService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            name: ColegioDBNameConnection,
            host: this.configService.get<string>('DB_HOST_COLEGIO_INGLES'),
            port: this.configService.get<number>('DB_PORT_COLEGIO_INGLES'),
            username: this.configService.get<string>('DB_USERNAME_COLEGIO_INGLES'),
            password: this.configService.get<string>('DB_PASSWORD_COLEGIO_INGLES'),
            database: this.configService.get<string>('DB_DBNAME_COLEGIO_INGLES'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: this.configService.isSynchronizeDBEnabled,
            migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
            subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
            cli: {
                migrationsDir: 'src/migrations',
            },
        };
    }
}
