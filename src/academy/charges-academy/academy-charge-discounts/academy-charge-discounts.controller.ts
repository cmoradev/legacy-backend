import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';
import { AcademyChargeDiscountsService } from './academy-charge-discounts.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

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
        limit: 200,
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
