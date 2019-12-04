import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ShiftService } from './shift.service';
import { Shift } from './entities/shift.entity';

@Crud({
  model: {
    type: Shift,
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
}