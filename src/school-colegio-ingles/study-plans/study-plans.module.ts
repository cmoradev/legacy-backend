import { Module } from '@nestjs/common';
import { StudyPlansController } from './study-plans.controller';
import { StudyPlansService } from './study-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyPlan } from './entities/study-plan.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([ StudyPlan ], ColegioDBNameConnection),
  ],
  exports: [ StudyPlansService ],
  controllers: [StudyPlansController],
  providers: [StudyPlansService],
})
export class StudyPlansModule {}
