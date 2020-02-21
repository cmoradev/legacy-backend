import { Controller } from '@nestjs/common';
import { CrudController } from '@nestjsx/crud';
import { Periods } from './entities/periods.entity';
import { PeriodsService } from './periods.service';

@Controller('periods')
export class PeriodsController implements CrudController<Periods> {
    constructor(readonly service: PeriodsService) {
    }

    get base(): CrudController<Periods> {
        return this;
    }
}
