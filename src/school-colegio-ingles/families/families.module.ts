import { Module } from '@nestjs/common';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Family ], ColegioDBNameConnection) ],
  exports: [ FamiliesService ],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
