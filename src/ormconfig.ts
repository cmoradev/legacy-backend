import {ConnectionOptions} from 'typeorm';

// You can load you .env file here synchronously using dotenv package (not installed here),
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environment = process.env.NODE_ENV || 'development';
const processEnv: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...
// Check typeORM documentation for more information.
console.log(`Migración corriendo --> en entorno ${process.env.NODE_ENV }`);
console.log(`Migración corriendo --> en la base de datos ${processEnv.DB_DBNAME_COLEGIO_INGLES}`);

const config: ConnectionOptions = {
  type: 'mysql',
  name: 'colegiodb',
  migrationsTableName: 'migrations_typeorm',
  host: processEnv.DB_HOST_COLEGIO_INGLES,
  port: processEnv.DB_PORT_COLEGIO_INGLES,
  username: processEnv.DB_USERNAME_COLEGIO_INGLES,
  password: processEnv.DB_PASSWORD_COLEGIO_INGLES,
  database: processEnv.DB_DBNAME_COLEGIO_INGLES,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: 'all',
  logger: 'simple-console',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entity',
    subscribersDir: 'src/subscriber',
  },
};

export = config;
