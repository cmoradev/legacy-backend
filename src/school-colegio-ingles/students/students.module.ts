import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Student ], ColegioDBNameConnection),
  ],
  exports: [StudentsService],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
