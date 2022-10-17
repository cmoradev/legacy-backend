import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyActivity } from './entities/academy-activity.entity';
import { AcademyActivitiesService } from './academy-activities.service';
import { QueryMensualidades } from './types/academyActvities.interface';
import { AcademyActivityReport } from './reports/academy-activity.report';
import { Request, Response } from 'express'
import { VwAcaGroupType } from './types/vw.aca.group.type';
import * as moment from 'moment';

@Crud({
    model: {
        type: AcademyActivity,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            academyActivityConcepts: {eager: false},
            academyActivityGroups: {eager: false},
            'academyActivityGroups.academyGroupCycle': {
                alias: 'academyGroupCycle',
                eager: false
            },
            academyActInscription: {eager: false},
        },
    },
})
@Controller()
export class AcademyActivitiesController implements CrudController<AcademyActivity> {
    constructor(
        readonly service: AcademyActivitiesService,
    ) {
    }

    get base(): CrudController<AcademyActivity> {
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

    @Post('/monthly-payments')
    async simpleReport(@Req() req: Request, @Res() res: Response, @Body() query: QueryMensualidades) {
        try {
            const data: VwAcaGroupType[] = await this.service.monthsPayments(query);

            if (query.file) {
                const excelReport = new AcademyActivityReport();

                const year = moment(query.month).year();
                const month = moment(query.month).month() + 1;

                const src = await excelReport.monthlyPayments(data, {year, month});

                const report = {
                    src,
                    type: 'excel',
                    name: `monthly-payments-${moment().format('YYYY-MM-DD')}`,
                };

                return res.send({report, data});
            } else {
                return res.send({report: false, data});
            }
        } catch (e) {
            return res.status(e?.status || 400).send(e?.response || e);
        }
    }
}
