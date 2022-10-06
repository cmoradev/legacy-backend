import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Modality } from './entities/modality.entity';
import { ModalitiesService } from './modalities.service';

@Crud({
    model: { type: Modality },
    query: {
        limit: 10,
        join: {},
    },
})
@Controller()
export class ModalitiesController implements CrudController<Modality> {

    constructor(readonly service: ModalitiesService) {
    }

    get base(): CrudController<Modality> {
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
