import { Module } from '@nestjs/common';
import { AcademyInscriptionStudentsService } from './academy-inscription-students.service';
import { AcademyInscriptionStudentsController } from './academy-inscription-students.controller';

@Module({
  providers: [AcademyInscriptionStudentsService],
  controllers: [AcademyInscriptionStudentsController]
})
export class AcademyInscriptionStudentsModule {}
