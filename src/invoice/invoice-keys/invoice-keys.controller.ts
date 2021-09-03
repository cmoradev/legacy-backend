import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoiceKeys } from './entities/invoice-keys.entity';
import { InvoiceKeysService } from './invoice-keys.service';

@Crud({
    model: {
        type: InvoiceKeys,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
    },
})
@Controller()
export class InvoiceKeysController implements CrudController<InvoiceKeys> {
    constructor(
        readonly service: InvoiceKeysService,
    ) {
    }

    get base(): CrudController<InvoiceKeys> {
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
