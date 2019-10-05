import { Module } from '@nestjs/common';
import { MatrixCompanyModule } from './matrix-company/matrix-company.module';

@Module({
    imports: [MatrixCompanyModule],
})
export class FixedAssetsModule {
}
