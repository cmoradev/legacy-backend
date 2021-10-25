import { Module } from '@nestjs/common';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([ Level ], ColegioDBNameConnection),
  ],
  exports: [LevelsService],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
