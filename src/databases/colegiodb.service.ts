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
      host: '0.0.0.0',
      port: 3399,
      username: 'produccion',
      password: 'kgjhld2019',
      database: 'colegio_pdc',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    };
  }
}
