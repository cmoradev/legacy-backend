import { Module } from '@nestjs/common';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../subjects/entities/family.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Family ], 'colegiodb') ],
  exports: [ FamiliesService ],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
