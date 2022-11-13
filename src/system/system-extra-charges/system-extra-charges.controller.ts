import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemExtraCharges } from './entities/system-extra-charges.entity';
import { SystemExtraChargesService } from './system-extra-charges.service';

@Crud({
  model: {
    type: SystemExtraCharges,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {
      extraChargesAppForms: {eager: false},
      extraChargesType: {eager: false},
      extraChargesCampus: {eager: false},
      extraChargesCycle: {eager: false},
    },
  },
})
@Controller()
export class SystemExtraChargesController implements CrudController<SystemExtraCharges> {
  constructor(readonly service: SystemExtraChargesService) {
  }

  get base(): CrudController<SystemExtraCharges> {
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
