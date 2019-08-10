import { Routes } from 'nest-router';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { SubjectsModule } from './school-colegio-ingles/subjects/subjects.module';
import { StudyPlansModule } from './school-colegio-ingles/study-plans/study-plans.module';
import { StudyPlanVariantsModule } from './school-colegio-ingles/study-plan-variants/study-plan-variants.module';
import { LevelsModule } from './school-colegio-ingles/levels/levels.module';

export const routes: Routes = [
    {
        path: '/school',
        module: SchoolColegioInglesModule,
        children: [
            { path: '/subjects', module: SubjectsModule },
            { path: '/study-plans', module: StudyPlansModule },
            { path: '/study-plan-variants', module: StudyPlanVariantsModule },
            { path: '/levels', module: LevelsModule },
        ],
    },
];
