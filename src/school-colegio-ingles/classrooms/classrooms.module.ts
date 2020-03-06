import { Module } from '@nestjs/common';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Classroom], ColegioDBNameConnection) ],
  exports: [ ClassroomsService ],
  controllers: [ ClassroomsController ],
  providers: [ ClassroomsService ],
})
export class ClassroomsModule {}
