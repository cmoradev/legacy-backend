import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Inscription } from '../inscriptions/entities/inscription.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Student, Inscription], ColegioDBNameConnection),
  ],
  exports: [StudentsService],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
