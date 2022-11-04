import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class GroupsService extends TypeOrmCrudService<Group> {
  constructor(
    @InjectRepository(Group, ColegioDBNameConnection)
    readonly repo: Repository<Group>,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.softDelete(id);
  }

  async getGroupsWithGrades() {
    return await this.repo
      .createQueryBuilder('group')
      .innerJoinAndSelect('group.groupGrade', 'grade')
      .getMany();
  }
}
