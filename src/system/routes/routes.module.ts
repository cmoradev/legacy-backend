import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Route ], ColegioDBNameConnection) ],
  exports: [RoutesService],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
