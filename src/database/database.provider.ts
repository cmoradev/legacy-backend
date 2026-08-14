// Modules
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// Services
import { ConfigService } from './../common/config/config.service';
import { ConfigModule } from './../common/config/config.module';
import { ColegioDBNameConnection } from './../common/databases/colegiodb.service';


export const databaseProviders = [
         TypeOrmModule.forRootAsync({
           imports: [ConfigModule],
           inject: [ConfigService],
           async useFactory(config: ConfigService) {
             return {
               type: 'mysql',
               name: ColegioDBNameConnection,
               host: config.get<string>('DB_HOST'),
               port: config.get<number>('DB_PORT'),
               username: config.get<string>('DB_USERNAME'),
               password: config.get<string>('DB_PASSWORD'),
               database: config.get<string>('DB_DBNAME'),
               entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
               migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
               subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
               cli: {
                 migrationsDir: 'src/migrations',
               },
             } as TypeOrmModuleOptions;
           },
         }),
       ];
