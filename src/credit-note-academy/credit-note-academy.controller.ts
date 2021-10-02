import { Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreditNoteAcademyService } from './credit-note-academy.service';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';

@Crud({
    model: {
        type: CreditNoteAcademy,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            },
        },
        join: {

        }
    }
})
@Controller('credit-note-academy')
export class CreditNoteAcademyController implements CrudController<CreditNoteAcademy> {
    constructor(readonly service: CreditNoteAcademyService) {
    }

    @Post('/generate-credit-note')
    async generateCreditNote(): Promise<void> {
        await this.service.createCreditNote();
    }

    @Get('/get-folio')
    async getfolio(): Promise<Number> {
        return await this.service.getFolio();
    }
}
