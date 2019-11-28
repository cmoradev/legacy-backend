import { Module } from '@nestjs/common';
import { AcademyActivitiesModule } from './academy-activities/academy-activities.module';
import { AcademyConceptsModule } from './academy-concepts/academy-concepts.module';
import { AcademyModalitiesModule } from './academy-modalities/academy-modalities.module';
import { AcademyDashBoardModule } from './academy-dash-board/academy-dash-board.module';
import { AcademyChargeModule } from './academy-charge/academy-charge.module';
import { AcademyChargeDetailsModule } from './academy-charge-details/academy-charge-details.module';
import { AcademyChargeDiscountsModule } from './academy-charge-discounts/academy-charge-discounts.module';
import { AcademyChargeSurchargesModule } from './academy-charge-surcharges/academy-charge-surcharges.module';
import { AcademyConceptsTypeModule } from './academy-concepts-type/academy-concepts-type.module';
import { AcademyChargeWayOfPayingModule } from './academy-charge-way-of-paying/academy-charge-way-of-paying.module';
import { AcademyChargeInvoiceModule } from './academy-charge-invoice/academy-charge-invoice.module';
import { AcademyActivitiesGroupModule } from './academy-activities-group/academy-activities-group.module';
import { AcademyInscriptionStatusModule } from './academy-inscription-status/academy-inscription-status.module';
import { AcademyInscriptionStudentsModule } from './academy-inscription-students/academy-inscription-students.module';
import { AcademyInscriptionExternalModule } from './academy-inscription-external/academy-inscription-external.module';
import { AcademyInscriptionConceptsModule } from './academy-inscription-concepts/academy-inscription-concepts.module';

@Module({
  imports: [
    AcademyActivitiesModule,
    AcademyConceptsModule,
    AcademyModalitiesModule,
    AcademyDashBoardModule,
    AcademyChargeModule,
    AcademyChargeDetailsModule,
    AcademyChargeDiscountsModule,
    AcademyChargeSurchargesModule,
    AcademyConceptsTypeModule,
    AcademyChargeWayOfPayingModule,
    AcademyChargeInvoiceModule,
    AcademyActivitiesGroupModule,
    AcademyInscriptionStatusModule,
    AcademyInscriptionStudentsModule,
    AcademyInscriptionExternalModule,
    AcademyInscriptionConceptsModule,
  ],
})
export class AcademyModule {
}
