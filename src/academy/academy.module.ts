import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { ConceptsModule } from './concepts/concepts.module';
import { AcademiesModalitiesModule } from './academies-modalities/academies-modalities.module';
import { AcademyDashBoardModule } from './academy-dash-board/academy-dash-board.module';

@Module({
  imports: [ActivitiesModule, ConceptsModule, AcademiesModalitiesModule, AcademyDashBoardModule],
})
export class AcademyModule {
}
