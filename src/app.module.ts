import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBService } from './databases/colegiodb.service';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      name: 'colegiodb',
      useClass: ColegioDBService,
    }),
    SchoolColegioInglesModule,
      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
