import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection, ColegioDBService } from './databases/colegiodb.service';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreModule } from './mini-store/mini-store.module';
import { XlsImporterModule } from './xls-importer/xls-importer.module';
import { ConfigModule } from './config/config.module';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { FixedAssetsControlModule } from './fixed-assets-control/fixed-assets-control.module';
import { SystemModule } from './system/system.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AcademyModule } from './academy/academy.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

// @ts-ignore left join only
// tslint:disable-next-line:only-arrow-functions
TypeOrmCrudService.prototype.getJoinType = function(s: string) {
  // tslint:disable-next-line:no-console
  return 'leftJoin';
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: ColegioDBNameConnection,
      useClass: ColegioDBService,
    }),
    // GraphQLModule.forRoot({
    //   debug: true,
    //   playground: true,
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: 'schema.gql',
    // }),

    // GraphQLModule.forRoot({
    //   debug: true,
    //   playground: true,
    //
    //   typeDefs: [__dirname + '**/*.graphql'],
    //   installSubscriptionHandlers: true,
    //   definitions: {
    //     path: join(process.cwd(), './src/graphql.schema.ts'),
    //     outputAs: 'class',
    //   },
    // }),
    ScheduleModule.forRoot(),
    ConfigModule,
    RouterModule.forRoutes(routes),
    SchoolColegioInglesModule,
    MiniStoreModule,
    XlsImporterModule,
    FixedAssetsControlModule,
    SystemModule,
    InvoiceModule,
    IntegrationsModule,
    AcademyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    RequestQueryBuilder.setOptions({
      delim: '$$',
    });
  }
}
