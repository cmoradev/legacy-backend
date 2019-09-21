import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CheckIn } from './entities/check-in.entity';
import { CheckInService } from './check-in.service';
import { base64ToImage } from '../../common/base64toImage';
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
    @Post('uploadSignature')
    async uploadSignature(@Body('signature') signature: string, @Body('idCheckIn') idCheckIn: number) {
        const dateImage = new Date().toLocaleString().replace(/\s/g, '_').replace(/\//g, '-').replace(/:/g, '-');
        const result = base64ToImage(signature, '/var/tmp/', { type: 'png', fileName: `signature-${dateImage}` });
        return await this.service.updateSignatureCheckIn(idCheckIn, result.fileName);
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
}
