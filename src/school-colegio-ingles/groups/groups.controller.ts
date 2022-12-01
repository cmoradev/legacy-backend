import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Crud({
  model: {
    type: Group,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {
      groupGrade: {
        alias: 'groupGrade',
        eager: false,
      },
      'groupGrade.level': {
        alias: 'groupGrade_level',
        eager: false,
      },
      'groupGrade.level.campus': {
        alias: 'campus',
        eager: false,
      },
      groupCycle: { eager: false },
      groupInscriptions: { eager: false },
      groupClassrooms: { eager: false },
    },
  },
})
@Controller()
export class GroupsController implements CrudController<Group> {
  constructor(readonly service: GroupsService) {}

  get base(): CrudController<Group> {
    return this;
  }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }
}
