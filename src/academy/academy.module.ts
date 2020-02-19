import { Module } from '@nestjs/common';
import { AcademyActivitiesModule } from './academy-activities/academy-activities.module';
import { AcademyConceptsModule } from './academy-concepts/academy-concepts.module';
import { AcademyModalitiesModule } from './academy-modalities/academy-modalities.module';
import { AcademyDashBoardModule } from './academy-dash-board/academy-dash-board.module';
import { AcademyActivitiesGroupModule } from './academy-activities-group/academy-activities-group.module';
import { AcademyInscriptionModule } from './academy-inscription/academy-inscription.module';
import { AcademyInscriptionConceptsModule } from './academy-inscription-concepts/academy-inscription-concepts.module';
import { ChargesAcademyModule } from './charges-academy/charges-academy.module';

@Module({
  imports: [
    AcademyActivitiesModule,
    AcademyConceptsModule,
    AcademyModalitiesModule,
    AcademyDashBoardModule,
    AcademyActivitiesGroupModule,
    AcademyInscriptionModule,
    AcademyInscriptionConceptsModule,
    ChargesAcademyModule,
  ],
})
export class AcademyModule {
}
