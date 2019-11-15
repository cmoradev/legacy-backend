import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { ConceptsModule } from './concepts/concepts.module';

@Module({
  imports: [ActivitiesModule, ConceptsModule],
})
export class AcademyModule {
}
