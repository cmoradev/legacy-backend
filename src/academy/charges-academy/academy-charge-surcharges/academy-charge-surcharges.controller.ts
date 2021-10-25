import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeSurcharges } from './entities/academy-charge-surcharges.entity';
import { AcademyChargeSurchargesService } from './academy-charge-surcharges.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyChargeSurcharges,
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
export class AcademyChargeSurchargesController implements CrudController<AcademyChargeSurcharges> {
    constructor(
        readonly service: AcademyChargeSurchargesService,
    ) {
    }

    get base(): CrudController<AcademyChargeSurcharges> {
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
