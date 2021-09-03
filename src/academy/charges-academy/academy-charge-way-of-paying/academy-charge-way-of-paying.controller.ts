import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeWayOfPaying } from './entities/academy-charge-way-of-paying.entity';
import { AcademyChargeWayOfPayingService } from './academy-charge-way-of-paying.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyChargeWayOfPaying,
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
export class AcademyChargeWayOfPayingController implements CrudController<AcademyChargeWayOfPaying> {
    constructor(
        readonly service: AcademyChargeWayOfPayingService,
    ) {
    }

    get base(): CrudController<AcademyChargeWayOfPaying> {
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
