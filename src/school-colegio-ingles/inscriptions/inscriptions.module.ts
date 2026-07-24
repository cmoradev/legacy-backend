import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Student } from '../students/entities/student.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { ClassroomsModule } from '../classrooms/classrooms.module';
import { LevelsModule } from '../levels/levels.module';
import { StudentsModule } from '../students/students.module';
import { GroupsModule } from '../groups/groups.module';
import { GradesModule } from '../grades/grades.module';
import { CyclesModule } from '../cycles/cycles.module';
import { BranchOfficeModule } from '../../system/branch-office/branch-office.module';
import { PaymentPlansModule } from '../payment-plans/payment-plans.module';
import { StudyPlanVariantsModule } from '../study-plan-variants/study-plan-variants.module';
import { StudyPlansModule } from '../study-plans/study-plans.module';
import { PaymentPlanConceptsModule } from '../payment-plan-concepts/payment-plan-concepts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Inscription, Student], ColegioDBNameConnection),
        ClassroomsModule,
        LevelsModule,
        StudentsModule,
        GroupsModule,
        GradesModule,
        CyclesModule,
        BranchOfficeModule,
        ClassroomsModule,
        PaymentPlansModule,
        PaymentPlanConceptsModule,
        StudyPlanVariantsModule,
        StudyPlansModule
    ],
    exports: [InscriptionsService],
    controllers: [InscriptionsController],
    providers: [InscriptionsService],
})
export class InscriptionsModule {
}
