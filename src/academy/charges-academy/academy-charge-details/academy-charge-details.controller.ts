import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';
import { AcademyChargeDetailsService } from './academy-charge-details.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: AcademyChargeDetails,
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
export class AcademyChargeDetailsController implements CrudController<AcademyChargeDetails> {
    constructor(
        readonly service: AcademyChargeDetailsService,
    ) {
    }

    get base(): CrudController<AcademyChargeDetails> {
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
