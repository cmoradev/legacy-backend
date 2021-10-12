import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchOfficeSetting }  from './entities/branch-office-setting.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class BranchOfficeSettingService extends TypeOrmCrudService<BranchOfficeSetting> {
  constructor(
    @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) repo: Repository<BranchOfficeSetting>,
  ) {
    super(repo);
  }

  async findCompany(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }
}
