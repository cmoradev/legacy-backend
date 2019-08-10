import { Module } from '@nestjs/common';
import { StudyPlansController } from './study-plans.controller';
import { StudyPlansService } from './study-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyPlan } from './entities/study-plan.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ StudyPlan ], 'colegiodb'),
  ],
  exports: [ StudyPlansService ],
  controllers: [StudyPlansController],
  providers: [StudyPlansService],
})
export class StudyPlansModule {}
