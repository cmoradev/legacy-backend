import { Module } from '@nestjs/common';
import { BranchOfficeController } from './branch-office.controller';
import { BranchOfficeService } from './branch-office.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchOffice } from './entities/branch-office.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([BranchOffice], ColegioDBNameConnection) ],
  exports: [ BranchOfficeService ],
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService],
})
export class BranchOfficeModule {}
