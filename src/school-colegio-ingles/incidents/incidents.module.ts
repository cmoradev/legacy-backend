import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([ Incident ], ColegioDBNameConnection),
  ],
  controllers: [IncidentsController],
  providers: [IncidentsService],
  exports: [IncidentsService],
})
export class IncidentsModule {}
