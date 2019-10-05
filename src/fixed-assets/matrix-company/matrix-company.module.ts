import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MatrixCompany } from './entities/matrix-company.entity';
import { MatrixCompanyService } from './matrix-company.service';
import { MatrixCompanyController } from './matrix-company.controller';

import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([MatrixCompany], ColegioDBNameConnection)],
    providers: [MatrixCompanyService],
    exports: [MatrixCompanyService],
    controllers: [MatrixCompanyController],
})
export class MatrixCompanyModule {
}
