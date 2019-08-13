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
import { CampusesModule } from './campuses/campuses.module';
import { FamiliesModule } from './families/families.module';

@Module({
  imports: [SubjectsModule,
    StudyPlansModule,
    StudyPlanVariantsModule,
    LevelsModule, GradesModule,
    StudentsModule, AssignmentsModule,
    ModalitiesModule, TeachersModule, AssignmentsSubjectsModule, GroupsModule, InscriptionsModule, CyclesModule, CampusesModule, FamiliesModule],
})
export class SchoolColegioInglesModule {}
