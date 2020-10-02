import { Module } from '@nestjs/common';
import { AcademyDashBoardService } from './academy-dash-board-service';
import { AcademyDashBoardController } from './academy-dash-board-controller';
import { AcademyInscriptionModule } from '../academy-inscription/academy-inscription.module';
import { StudentsModule } from '../../school-colegio-ingles/students/students.module';
import { AcademyActivitiesModule } from '../academy-activities/academy-activities.module';
import { CyclesModule } from '../../school-colegio-ingles/cycles/cycles.module';
import { AcademyChargePaymentsModule } from '../charges-academy/academy-charge-payments/academy-charge-payments.module';

@Module({
  imports: [
    AcademyInscriptionModule,
    StudentsModule,
    AcademyActivitiesModule,
    CyclesModule,
    AcademyChargePaymentsModule,
  ],
  exports: [AcademyDashBoardService],
  providers: [AcademyDashBoardService],
  controllers: [AcademyDashBoardController],
})
export class AcademyDashBoardModule {
}
