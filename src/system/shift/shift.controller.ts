import {Controller, Delete, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ShiftService } from './shift.service';
import { Shift } from './entities/shift.entity';

@Crud({
  model: {
    type: Shift,
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
export class ShiftController implements CrudController<Shift> {
  constructor(
    readonly service: ShiftService,
  ) {}
  get base(): CrudController<Shift> {
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