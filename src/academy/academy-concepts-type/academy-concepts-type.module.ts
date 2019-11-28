import { Module } from '@nestjs/common';
import { AcademyConceptsTypeService } from './academy-concepts-type.service';
import { AcademyConceptsTypeController } from './academy-concepts-type.controller';

@Module({
  providers: [AcademyConceptsTypeService],
  controllers: [AcademyConceptsTypeController]
})
export class AcademyConceptsTypeModule {}
