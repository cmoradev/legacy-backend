import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Inscription } from './entities/inscription.entity';
import { InscriptionsService } from './inscriptions.service';
import { diskStorage } from 'multer';
import xlsx from 'node-xlsx';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';
import { VerificarInscriprions } from './interfaces/inscriptions.interface';
import { ExcelSheet } from '../../common/office/sheets/interfaces/excel.interface';
import { sheetToObjPage } from '../../common/office/sheets';

@Crud({
    model: {
        type: Inscription,
    },
    query: {
        maxLimit: 200,
        join: {
            inscripStudent: {},
            inscripCampus: {},
            inscripGrade: {},
            inscripGroup: {},
            inscripLevel: {},
            inscripCycle: {},
            inscripAgentCreator: {},
            inscripAgentEditor: {},
            inscripClassroom: {},
            paymentPlan: {},
            inscripAssignmentsInscription: {},
            inscripStudyPlanVariant: {},
            inscripStudyPlan: {},
            schoolPayments: {},
        },
    },
})
@Controller()
export class InscriptionsController implements CrudController<Inscription> {
    constructor(
        readonly service: InscriptionsService,
    ) {
    }

    get base(): CrudController<Inscription> {
        return this;
    }

    @Get('/amir')
    async verify(): Promise<any> {
        return 'amir';
    }

    @Post('/verifyinscription')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            },
        }),
    }))
    async verifyregistration(@UploadedFile() file, @Body() data: VerifyregistratioDto): Promise<any> {
        const pathfile = path.join(__dirname, `../../../uploads/` + file.filename);
        const Sheets: ExcelSheet[] = xlsx.parse(pathfile);
        const inscripcion: VerificarInscriprions = await sheetToObjPage(Sheets);
        return await this.service.verificarInscription(inscripcion, data);
    }
}
