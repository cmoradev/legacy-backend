import { Module } from '@nestjs/common';
import { StudyPlanVariantsController } from './study-plan-variants.controller';
import { StudyPlanVariantsService } from './study-plan-variants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([ StudyPlanVariant ], ColegioDBNameConnection),
  ],
  exports: [ StudyPlanVariantsService ],
  controllers: [StudyPlanVariantsController],
  providers: [StudyPlanVariantsService],
})
export class StudyPlanVariantsModule {}
