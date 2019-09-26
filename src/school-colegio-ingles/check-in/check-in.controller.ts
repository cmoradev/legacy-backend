import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CheckIn } from './entities/check-in.entity';
import { CheckInService } from './check-in.service';
import {Response} from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
    constructor(readonly service: CheckInService) {}
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
        return await this.service.updateSignatureCheckIn(idCheckIn, file.originalname);

    }
    @Post('out')
    async makeCheckOut(@Body('guestBadgeCode') guestBadgeCode: string) {
        return this.service.makeCheckOut(parseInt(guestBadgeCode, 10));
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
            const checkIns = await this.service.getCheckInWithStatusInside(parseInt(gaffete, 10));
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
}
