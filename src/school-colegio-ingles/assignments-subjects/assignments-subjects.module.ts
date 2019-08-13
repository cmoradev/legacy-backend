import { Module } from '@nestjs/common';
import { AssignmentsSubjectsController } from './assignments-subjects.controller';
import { AssignmentsSubjectsService } from './assignments-subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentSubject } from './entities/assignment-subject.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([AssignmentSubject], 'colegiodb') ],
  exports: [ AssignmentsSubjectsService ],
  controllers: [AssignmentsSubjectsController],
  providers: [AssignmentsSubjectsService],
})
export class AssignmentsSubjectsModule {}
