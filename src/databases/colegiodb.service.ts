import { Injectable } from '@nestjs/common';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { isDesktop } from '../common/desktop/desktop.config';
import entities from './index';

const environment = process.env.NODE_ENV || 'development';
const processEnv: any = isDesktop ? null : dotenv.parse(fs.readFileSync(`${environment}.env`));
export const ColegioDBNameConnection = isDesktop ? 'muunyal' : processEnv.DB_DBNAME_CONNECTION;
console.log('varible de entorno export ' + ColegioDBNameConnection);

@Injectable()
export class ColegioDBService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const SQLite = {
      type: 'sqlite',
      name: ColegioDBNameConnection,
      database: 'db.db',
      entities: [...entities],
      synchronize: true,
    } as TypeOrmModuleOptions;

    const MySql = {
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
    } as TypeOrmModuleOptions;
    return isDesktop ? SQLite : MySql;
  }
}
