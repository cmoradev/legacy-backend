import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CheckIn } from './entities/check-in.entity';
import { CheckInService, StatusCheckIn } from './check-in.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { getDates, TypeFilterDate } from '../../common/time-utils';
import { Repository } from 'typeorm';
import { Department } from '../../system/departments/entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AcademicService } from '../../integrations/academic/academic.service';
import {List} from 'immutable';
import { AcademicStudent } from '../../integrations/academic/interfaces/academic-student.interface';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
@Crud({
    model: {
        type: CheckIn,
    },
    query: {
        join: {
            department: {},
        },
    },
})
@Controller()
export class CheckInController implements CrudController<CheckIn> {
    constructor(
      readonly service: CheckInService,
      @InjectRepository(Department, ColegioDBNameConnection)
      private readonly departmentRepository: Repository<Department>,
      private readonly academicService: AcademicService,
      ) {}
    get base(): CrudController<CheckIn> {
        return this;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './signatures');
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}_${file.originalname}.png`);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file, @Body('idCheckIn') idCheckIn: number) {
        return await this.service.updateSignatureCheckIn(idCheckIn, file.filename);

    }
    @Post('out')
    async makeCheckOut(@Body('guestBadgeCode') guestBadgeCode: string) {
        return this.service.makeCheckOut(guestBadgeCode);
    }
    @Post('statusGaffete')
    async checkStatusGaffete(@Res() res: Response, @Body('gaffete') gaffete: string) {
        if (!gaffete) {
            res.status(HttpStatus.BAD_REQUEST).send({
                code: 'CHECK-IN/GAFFETE/ERROR/NOTGAFFETE',
                message: 'Existe una persona asociada a su gaffete, contacte con el guardia.',
            });
        }
        try {
            const checkIns = await this.service.getCheckInWithStatusInside(gaffete);
            if (checkIns.length === 1) {
                res.status(HttpStatus.ACCEPTED).send({
                    inside: true,
                    code: 'CHECK-IN/GAFFETE/INSIDE/ONE',
                    message: 'Existe una persona asociada a su gaffete, contacte con el guardia.',
                    data: checkIns,
                });
            } else if (checkIns.length > 1) {
                res.status(HttpStatus.ACCEPTED).send({
                    inside: true,
                    code: `CHECK-IN/GAFFETE/INSIDE/MUCH`,
                    message: 'Existe más de una persona asociada a su gaffete, contacte con el guardia.',
                    data: checkIns,
                });
            } else {
                res.status(HttpStatus.ACCEPTED).send({
                    inside: false,
                    code: `CHECK-IN/GAFFETE/NOT-INSIDE`,
                    message: 'Gaffete Disponible',
                    data: checkIns,
                });
            }
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).send({
                code: 'CHECK-IN/GAFFETE/ERROR_REQUEST',
                data: e,
            });
        }
    }

    @Get('stats/total')
    async getStatsOfBusiness(@Query() query: { filter: TypeFilterDate }) {
        const dates = getDates({ filter: query.filter });
        return await this.service.getStatsTotalCheckIn(dates);
    }
    @Get('stats/total-department')
    async getStatsByDepartment(@Query() query: { filter: TypeFilterDate }) {
        const dates = getDates({ filter: query.filter });
        const promiseDepartments = this.departmentRepository.find();
        const promiseGetStatsByDepartment = this.service.getStatsByDepartment(dates);
        const [ departments, statsByDepartment ] = await Promise.all([ promiseDepartments, promiseGetStatsByDepartment ]);
        return departments.map((department) => {
            const payload = { name: department.name, quantity: 0 };
            for (const stats of statsByDepartment) {
                if (stats.name === department.name ) {
                    payload.quantity = parseInt(stats.quantity, 10);
                }
            }
            return payload;
        });
    }
    @Get('stats/total-status')
    async getStatsByStatus(@Query() query: { filter: TypeFilterDate }) {
        const dates = getDates({ filter: query.filter });
        const statsStatus = await this.service.getStatsByStatus(dates);
        const stats = Object.keys(StatusCheckIn).filter(x => !(parseInt(x, 10) >= 0));
        return stats.map((nameStat) => {
            const newStat = { name: nameStat, quantity: 0 };
            for (const stat of statsStatus) {
                if (stat.status === nameStat) {
                    newStat.quantity = parseInt(stat.quantity, 10);
                }
            }
            return newStat;
        });
    }
    @Get('stats/total-dating')
    async getStatsByDating(@Query() query: { filter: TypeFilterDate }) {
        const dates = getDates({ filter: query.filter });
        const statsInDating = await this.service.getStatsInDating(dates);
        const newStat = [ 'Sin Cita', 'Con Cita' ];
        return newStat.map((word) => {
            const newPayload = { name: word, quantity: 0 };
            for (const stat of statsInDating) {
                if (stat.isDating === 0 && word === 'Sin Cita') {
                    newPayload.quantity = parseInt(stat.quantity, 10);
                }
                if (stat.isDating === 1 && word === 'Con Cita') {
                    newPayload.quantity = parseInt(stat.quantity, 10);
                }
            }
            return newPayload;
        });
    }
    @Get('now/people-check-in')
    async getNowPeopleByStatus(@Query() query: { filter: TypeFilterDate, limit: string  }) {
        const dates = getDates({ filter: query.filter });
        return await this.service.getPeopleByStatus(dates, parseInt(query.limit, 10));
    }
    @Get('status/student/:matricula')
    async getStatusStudent(@Param('matricula') code: string) {
        const students = await this.academicService.getAllStudents();
        const studentsList = List(students);
        console.log(code);
        return students;
    }
}
