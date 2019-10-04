import { Module } from '@nestjs/common';
import { MatrixCompanyModule } from './matrix-company/matrix-company.module';
import { BranchCompanyModule } from './branch-company/branch-company.module';

@Module({
    imports: [
        MatrixCompanyModule,
        BranchCompanyModule,
    ],
})
export class FixedAssetsModule {
}
