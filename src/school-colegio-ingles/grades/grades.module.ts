import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Classroom } from '../classrooms/entities/classroom.entity';
import { Inscription } from '../inscriptions/entities/inscription.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Grade, Classroom, Inscription], ColegioDBNameConnection)],
  exports: [GradesService],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
