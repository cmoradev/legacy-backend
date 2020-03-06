import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Grade], ColegioDBNameConnection)],
  exports: [GradesService],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
