import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects/subjects.module';
import { StudyPlansModule } from './study-plans/study-plans.module';
import { StudyPlanVariantsModule } from './study-plan-variants/study-plan-variants.module';
import { LevelsModule } from './levels/levels.module';
import { GradesModule } from './grades/grades.module';
import { StudentsModule } from './students/students.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ModalitiesModule } from './modalities/modalities.module';
import { TeachersModule } from './teachers/teachers.module';
import { AssignmentsSubjectsModule } from './assignments-subjects/assignments-subjects.module';
import { GroupsModule } from './groups/groups.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { CyclesModule } from './cycles/cycles.module';
import { FamiliesModule } from './families/families.module';
import { ClassroomsModule } from './classrooms/classrooms.module';


import { AssignmentIncriptionModule } from './assignment-incription/assignment-incription.module';
import { ClassroomPermissionModule } from './classroom-permission/classroom-permission.module';
import { IncidentsModule } from './incidents/incidents.module';
import { IncidentClassificationModule } from './incident-classification/incident-classification.module';
import { CheckInModule } from './check-in/check-in.module';
import { SchoolDashBoardModule } from './school-dash-board/school-dash-board.module';
import { FamilyFiscalModule } from './family-fiscal/family-fiscal.module';
import { FamilyMembersModule } from './family-members/family-members.module';
import { PaymentPlansModule } from './payment-plans/payment-plans.module';
import { PaymentPlanConceptsModule } from './payment-plan-concepts/payment-plan-concepts.module';
import { ChargesSchoolModule } from './charges-school/charges-school.module';
import { SchoolPaymentsModule } from './school-payments/school-payments.module';
import { PeriodsModule } from './periods/periods.module';
import { PaymentPlanConceptChargesModule } from './payment-plan-concept-charges/payment-plan-concept-charges.module';

@Module({
    imports: [
        SubjectsModule,
        StudyPlansModule,
        StudyPlanVariantsModule,
        LevelsModule, GradesModule,
        StudentsModule, AssignmentsModule,
        ModalitiesModule,
        TeachersModule,
        AssignmentsSubjectsModule,
        GroupsModule, InscriptionsModule,
        CyclesModule,
        FamiliesModule,
        ClassroomsModule,
        AssignmentIncriptionModule, ClassroomPermissionModule,
        IncidentsModule, IncidentClassificationModule,
        CheckInModule, SchoolDashBoardModule, FamilyFiscalModule,
        FamilyMembersModule, PaymentPlansModule, PaymentPlanConceptsModule,
        SchoolPaymentsModule, ChargesSchoolModule, PeriodsModule, PaymentPlanConceptChargesModule,
    ],
})
export class SchoolColegioInglesModule {
}
