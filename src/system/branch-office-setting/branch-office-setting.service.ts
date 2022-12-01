import {Injectable, NotFoundException} from '@nestjs/common';
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

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({id}, {withDeleted: true});
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.restore(id);
  }

  async findCompany(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }
}
