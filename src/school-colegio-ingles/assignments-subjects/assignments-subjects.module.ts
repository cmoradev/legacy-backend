import { Module } from '@nestjs/common';
import { AssignmentsSubjectsController } from './assignments-subjects.controller';
import { AssignmentsSubjectsService } from './assignments-subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentSubject } from './entities/assignment-subject.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([AssignmentSubject], ColegioDBNameConnection) ],
  exports: [ AssignmentsSubjectsService ],
  controllers: [AssignmentsSubjectsController],
  providers: [AssignmentsSubjectsService],
})
export class AssignmentsSubjectsModule {}
