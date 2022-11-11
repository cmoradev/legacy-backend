import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargeDetails } from './entities/school-charge-details.entity';
import { SchoolChargesDetailsService } from './school-charges-details.service';

@Crud({
    model: {
        type: SchoolChargeDetails,
    },
    query: {
        limit: 10,
        join: {
            schoolCharge: {eager: false},
            extraCharges: {eager: false},
            schoolPayment: {eager: false},
        },
    },
})
@Controller()
export class SchoolChargesDetailsController implements CrudController<SchoolChargeDetails> {
    constructor(
        readonly service: SchoolChargesDetailsService,
    ) {
    }

    get base(): CrudController<SchoolChargeDetails> {
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
