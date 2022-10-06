import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetailsExtraCharge } from './entities/academy-charge-details-extra-charge.entity';
import { AcademyChargeDetailsExtraChargeService } from './academy-charge-details-extra-charge.service';

@Crud({
    model: {
        type: AcademyChargeDetailsExtraCharge,
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
export class AcademyChargeDetailsExtraChargeController implements CrudController<AcademyChargeDetailsExtraCharge> {
    constructor(
        readonly service: AcademyChargeDetailsExtraChargeService,
    ) {
    }

    get base(): CrudController<AcademyChargeDetailsExtraCharge> {
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
