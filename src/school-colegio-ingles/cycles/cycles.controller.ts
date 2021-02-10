import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cycle } from './entities/cycle.entity';
import { CyclesService } from './cycles.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: Cycle,
    },
})
@Controller()
export class CyclesController implements CrudController<Cycle> {
    constructor(readonly service: CyclesService) {}
    get base(): CrudController<Cycle> {
        return this;
    }
}
