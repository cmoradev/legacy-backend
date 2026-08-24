import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';


const environment = process.env.NODE_ENV || 'development';
let config: BaseConnectionOptions;
if (fs.existsSync(`${environment}.env`)) {
    const processEnv: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

    config = {
        type: 'mysql',
        name: processEnv.DB_DBNAME_CONNECTION,
        migrationsTableName: 'migrations_typeorm',
        host: processEnv.DB_HOST,
        port: processEnv.DB_PORT,
        username: processEnv.DB_USERNAME,
        password: processEnv.DB_PASSWORD,
        database: processEnv.DB_DBNAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        seeds: [__dirname + '/**/*.seed{.ts,.js}'],
        factories: [__dirname + '/**/*.factory{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
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
        cli: {
            // Location of migration should be inside src folder
            // to be compiled into dist/ folder.
            migrationsDir: 'src/migrations',
            entitiesDir: 'src/entity',
            subscribersDir: 'src/subscriber',
        },
    } as BaseConnectionOptions;
}
export = config;
