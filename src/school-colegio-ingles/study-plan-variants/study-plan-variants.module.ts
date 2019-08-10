import { Module } from '@nestjs/common';
import { StudyPlanVariantsController } from './study-plan-variants.controller';
import { StudyPlanVariantsService } from './study-plan-variants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ StudyPlanVariant ], 'colegiodb'),
  ],
  exports: [ StudyPlanVariantsService ],
  controllers: [StudyPlanVariantsController],
  providers: [StudyPlanVariantsService],
})
export class StudyPlanVariantsModule {}
