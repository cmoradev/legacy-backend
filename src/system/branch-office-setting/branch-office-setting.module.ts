import { Module } from '@nestjs/common';
import { BranchOfficeSettingService } from './branch-office-setting.service';
import { BranchOfficeSettingController } from './branch-office-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchOfficeSetting } from './entities/branch-office-setting.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([BranchOfficeSetting], ColegioDBNameConnection)],
  providers: [BranchOfficeSettingService],
  exports: [BranchOfficeSettingService],
  controllers: [BranchOfficeSettingController],
})
export class BranchOfficeSettingModule {
}
