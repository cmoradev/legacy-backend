import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { ConceptsModule } from './concepts/concepts.module';
import { AcademiesModalitiesModule } from './academies-modalities/academies-modalities.module';

@Module({
  imports: [ActivitiesModule, ConceptsModule, AcademiesModalitiesModule],
})
export class AcademyModule {
}
