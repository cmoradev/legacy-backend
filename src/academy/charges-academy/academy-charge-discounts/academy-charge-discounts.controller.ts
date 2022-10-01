import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';
import { AcademyChargeDiscountsService } from './academy-charge-discounts.service';

@Crud({
    model: {
        type: AcademyChargeDiscounts,
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
export class AcademyChargeDiscountsController implements CrudController<AcademyChargeDiscounts> {
    constructor(
        readonly service: AcademyChargeDiscountsService,
    ) {
    }

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }

    get base(): CrudController<AcademyChargeDiscounts> {
        return this;
    }
}
