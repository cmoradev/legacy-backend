import { Module } from '@nestjs/common';
import { AssignmentIncriptionController } from './assignment-incription.controller';
import { AssignmentIncriptionService } from './assignment-incription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentInscription } from './entities/assignment-inscription.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ AssignmentInscription ], 'colegiodb') ],
  exports: [ AssignmentIncriptionService ],
  controllers: [AssignmentIncriptionController],
  providers: [AssignmentIncriptionService],
})
export class AssignmentIncriptionModule {}
