import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects/subjects.module';
import { StudyPlansModule } from './study-plans/study-plans.module';
import { StudyPlanVariantsModule } from './study-plan-variants/study-plan-variants.module';
import { LevelsModule } from './levels/levels.module';
import { GradesModule } from './grades/grades.module';
import { StudentsModule } from './students/students.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [SubjectsModule, StudyPlansModule, StudyPlanVariantsModule, LevelsModule, GradesModule, StudentsModule, AssignmentsModule],
})
export class SchoolColegioInglesModule {}
