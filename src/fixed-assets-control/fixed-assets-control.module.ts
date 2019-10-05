import { Module } from '@nestjs/common';
import { MatrixCompaniesModule } from './matrix-companies/matrix-companies.module';
import { BranchCompaniesModule } from './branch-companies/branch-companies.module';
import { EmployeesModule } from './employees/employees.module';
import { JobPositionsModule } from './job-positions/job-positions.module';

@Module({
    imports: [
        MatrixCompaniesModule,
        BranchCompaniesModule,
        EmployeesModule,
        JobPositionsModule,
    ],
})
export class FixedAssetsModule {
}
