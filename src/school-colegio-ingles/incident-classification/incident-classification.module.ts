import { Module } from '@nestjs/common';
import { IncidentClassificationController } from './incident-classification.controller';
import { IncidentClassificationService } from './incident-classification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentClassification } from './entities/incident-classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ IncidentClassification ], 'colegiodb')],
  controllers: [IncidentClassificationController],
  providers: [IncidentClassificationService],
  exports: [ IncidentClassificationService ],
})
export class IncidentClassificationModule {}
