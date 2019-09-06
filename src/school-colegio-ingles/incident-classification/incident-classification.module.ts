import { Module } from '@nestjs/common';
import { IncidentClassificationController } from './incident-classification.controller';
import { IncidentClassificationService } from './incident-classification.service';

@Module({
  controllers: [IncidentClassificationController],
  providers: [IncidentClassificationService],
})
export class IncidentClassificationModule {}
