import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
const envFile = `${environment}.env`;
let processEnv: any;
if (fs.existsSync(envFile)) {
  processEnv = dotenv.parse(fs.readFileSync(envFile));
} else {
  processEnv = process.env;
}
export const ColegioDBNameConnection = processEnv.DB_DBNAME_CONNECTION;

@Injectable()
export class ColegioDBService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: ColegioDBNameConnection,
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DBNAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: this.configService.isSynchronizeDBEnabled,
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    } as TypeOrmModuleOptions;
  }
}