import { Module } from '@nestjs/common';
import { BranchCompaniesService } from './branch-companies.service';
import { BranchCompaniesController } from './branch-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchCompany } from './entities/branch-company.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([BranchCompany], ColegioDBNameConnection)],
    providers: [BranchCompaniesService],
    controllers: [BranchCompaniesController],
    exports: [BranchCompaniesService],
})
export class BranchCompaniesModule {
}
