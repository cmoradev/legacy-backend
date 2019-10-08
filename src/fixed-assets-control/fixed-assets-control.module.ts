import { Module } from '@nestjs/common';
import { MatrixCompaniesModule } from './matrix-companies/matrix-companies.module';
import { BranchCompaniesModule } from './branch-companies/branch-companies.module';
import { EmployeesModule } from './employees/employees.module';
import { JobPositionsModule } from './job-positions/job-positions.module';
import { FixedAssetsModule } from './fixed-assets/fixed-assets.module';
import { FixedAssetsAssignmentsModule } from './fixed-assets-assignments/fixed-assets-assignments.module';
import { ResponsiveLettersModule } from './responsive-letters/responsive-letters.module';
import { LocationsModule } from './locations/locations.module';

@Module({
    imports: [
        MatrixCompaniesModule,
        BranchCompaniesModule,
        EmployeesModule,
        JobPositionsModule,
        FixedAssetsModule,
        FixedAssetsAssignmentsModule,
        ResponsiveLettersModule,
        LocationsModule,
    ],
})
export class FixedAssetsControlModule {
}
