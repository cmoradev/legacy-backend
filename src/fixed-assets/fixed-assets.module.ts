import { Module } from '@nestjs/common';
import { MatrixCompaniesModule } from './matrix-companies/matrix-companies.module';
import { BranchCompaniesModule } from './branch-companies/branch-companies.module';

@Module({
    imports: [
        MatrixCompaniesModule,
        BranchCompaniesModule,
    ],
})
export class FixedAssetsModule {
}
