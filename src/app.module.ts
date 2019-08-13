import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBService } from './databases/colegiodb.service';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TeachersModule } from './school-colegio-ingles/teachers/teachers.module';
import { MiniStoreModule } from './mini-store/mini-store.module';

// @ts-ignore left join only
// tslint:disable-next-line:only-arrow-functions
TypeOrmCrudService.prototype.getJoinType = function(s: string) {
    // tslint:disable-next-line:no-console
    return 'leftJoin';
};

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            name: 'colegiodb',
            useClass: ColegioDBService,
        }),
        RouterModule.forRoutes(routes),
        SchoolColegioInglesModule,
        MiniStoreModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
