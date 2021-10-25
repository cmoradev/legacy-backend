import { Module } from '@nestjs/common';
import { IncidentClassificationController } from './incident-classification.controller';
import { IncidentClassificationService } from './incident-classification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentClassification } from './entities/incident-classification.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([ IncidentClassification ], ColegioDBNameConnection)],
  controllers: [IncidentClassificationController],
  providers: [IncidentClassificationService],
  exports: [ IncidentClassificationService ],
})
export class IncidentClassificationModule {}
