import { Routes } from 'nest-router';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { SubjectsModule } from './school-colegio-ingles/subjects/subjects.module';
import { StudyPlansModule } from './school-colegio-ingles/study-plans/study-plans.module';
import { StudyPlanVariantsModule } from './school-colegio-ingles/study-plan-variants/study-plan-variants.module';
import { LevelsModule } from './school-colegio-ingles/levels/levels.module';
import { GradesModule } from './school-colegio-ingles/grades/grades.module';
import { StudentsModule } from './school-colegio-ingles/students/students.module';
import { AssignmentsModule } from './school-colegio-ingles/assignments/assignments.module';
import { ModalitiesModule } from './school-colegio-ingles/modalities/modalities.module';
import { TeachersModule } from './school-colegio-ingles/teachers/teachers.module';
import { GroupsModule } from './school-colegio-ingles/groups/groups.module';
import { InscriptionsModule } from './school-colegio-ingles/inscriptions/inscriptions.module';
import { CyclesModule } from './school-colegio-ingles/cycles/cycles.module';

export const routes: Routes = [
    {
        path: '/school',
        module: SchoolColegioInglesModule,
        children: [
            { path: '/subjects', module: SubjectsModule },
            { path: '/study-plans', module: StudyPlansModule },
            { path: '/study-plan-variants', module: StudyPlanVariantsModule },
            { path: '/levels', module: LevelsModule },
            { path: '/grades', module: GradesModule },
            { path: '/students', module: StudentsModule },
            { path: '/assignments', module: AssignmentsModule },
            { path: '/modalities', module: ModalitiesModule },
            { path: '/teachers', module: TeachersModule },
            { path: '/assignments-subjects', module: AssignmentsModule },
            { path: '/groups', module: GroupsModule },
            { path: '/inscriptions', module: InscriptionsModule },
            { path: '/cycles', module: CyclesModule },
        ],
    },
];
