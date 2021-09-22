import { Module } from '@nestjs/common';
import { AssignmentIncriptionController } from './assignment-incription.controller';
import { AssignmentIncriptionService } from './assignment-incription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentInscription } from './entities/assignment-inscription.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ AssignmentInscription ], ColegioDBNameConnection) ],
  exports: [ AssignmentIncriptionService ],
  controllers: [AssignmentIncriptionController],
  providers: [AssignmentIncriptionService],
})
export class AssignmentIncriptionModule {}
