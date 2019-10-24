import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBService } from './databases/colegiodb.service';
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
            name: 'colegiodb',
            useClass: ColegioDBService,
        }),
        ConfigModule,
        RouterModule.forRoutes(routes),
        SchoolColegioInglesModule,
        MiniStoreModule,
        XlsImporterModule,
        FixedAssetsControlModule,
        SystemModule,
        IntegrationsModule,
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
