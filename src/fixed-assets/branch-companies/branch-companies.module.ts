import { Module } from '@nestjs/common';
import { BranchCompanyService } from './branch-company.service';
import { BranchCompanyController } from './branch-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchCompany } from './entities/branch-company.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([BranchCompany], ColegioDBNameConnection)],
    providers: [BranchCompanyService],
    controllers: [BranchCompanyController],
    exports: [BranchCompanyService],
})
export class BranchCompanyModule {
}
