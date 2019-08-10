import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBService } from './databases/colegiodb.service';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            name: 'colegiodb',
            useClass: ColegioDBService,
        }),
        RouterModule.forRoutes(routes),
        SchoolColegioInglesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
