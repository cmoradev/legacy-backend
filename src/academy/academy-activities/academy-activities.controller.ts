import {Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, Res} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {AcademyActivity} from './entities/academy-activity.entity';
import {AcademyActivitiesService} from './academy-activities.service';
import {QueryMensualidades} from './types/academyActvities.interface';
import {AcademyActivityReport} from './reports/academy-activity.report';
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

    @Get('/monthly-payments')
    async simpleReport(@Req() request, @Res() response, @Query() query: QueryMensualidades) {
        const year = moment(query.month).year();
        const month = moment(query.month).month() + 1;

        const data = await this.service.monthsPayments(query);
        if (query.file) {
            const report = new AcademyActivityReport();
            const file = await report.monthlyPayments(data, {year, month});
            response.send({
                src: file,
                type: 'excel',
                name: 'monthly-payments',
            });
        } else {
            response.send(data);
        }
    }
}
