import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';
import { AcademyInscriptionConceptsService } from './academy-inscription-concepts.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: AcademyInscriptionConcepts,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            }
        },
        limit: 200,
        join: {
            acInsConActivity: {},
            acInsConConcepType: {},
            acInsConStatusPayment: {},
            acInscription: {},
            academyChargeDetail: {},
            extraCharges: {},
        },
    },
})
@Controller()
export class AcademyInscriptionConceptsController implements CrudController<AcademyInscriptionConcepts> {
    constructor(
        readonly service: AcademyInscriptionConceptsService,
    ) {
    }

    get base(): CrudController<AcademyInscriptionConcepts> {
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

    // @Get('/fix')
    // async fixMonths(@Query() data: { key: string, save: boolean }, @Req() request, @Res() res: Response) {
    //     const newDate = [];
    //     const concepts = await this.service.repo.find({
    //         where: {
    //             idConceptoCobro: 2,
    //             keyInscription: data.key,
    //         },
    //     });
    //
    //     const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    //     let year = 2020;
    //     for (const concept of concepts) {
    //         const month = meses.indexOf(concept.description.split('-')[1].trim().toLowerCase()) + 1;
    //
    //         const format = month < 10 ? '0' + month.toString() : month;
    //         // newDate.push({
    //         //     id: concept.id,
    //         //     month: concept.description.split('-')[1].trim(),
    //         //     number: format,
    //         //     date: year + '-' + format + '-01',
    //         // });
    //         concept.payMonth = month;
    //         // @ts-ignore
    //         concept.payDate = year + '-' + format + '-01';
    //         if (data.save) {
    //             await this.service.repo.save(concept);
    //         } else {
    //         }
    //         if (concept.description.split('-')[1].trim() === 'diciembre') {
    //             year = 2021;
    //         }
    //     }
    //     res.send(concepts);
    // }
}
