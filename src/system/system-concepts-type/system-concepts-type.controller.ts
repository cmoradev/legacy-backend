import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemConceptsType } from './entities/system-concepts-type.entity';
import { SystemConceptsTypeService } from './system-concepts-type.service';

@Crud({
  model: {
    type: SystemConceptsType,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {},
  },
})
@Controller()
export class SystemConceptsTypeController implements CrudController<SystemConceptsType> {
  constructor(readonly service: SystemConceptsTypeService) { }
  get base(): CrudController<SystemConceptsType> {
    return this;
  }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
