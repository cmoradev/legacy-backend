import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MatrixCompany } from './entities/matrix-company.entity';
import { MatrixCompaniesService } from './matrix-companies.service';
import { MatrixCompaniesController } from './matrix-companies.controller';

import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([MatrixCompany], ColegioDBNameConnection)],
    providers: [MatrixCompaniesService],
    exports: [MatrixCompaniesService],
    controllers: [MatrixCompaniesController],
})
export class MatrixCompaniesModule {
}
