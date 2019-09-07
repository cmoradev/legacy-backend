import {Injectable} from '@nestjs/common';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

@Injectable()
export class ColegioDBService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: 'colegiodb',
      host: '138.68.253.42',
      port: 3399,
      username: 'staging',
      password: 'staging',
      database: 'colegio_pdc_staging',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    };
  }
}
