import {
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post, Put,
    Query,
    Req,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Crud, CrudController } from '@nestjsx/crud';
import { Company } from './entities/company.entity';
import { SettingsService } from './settings.service';
import { Public } from '../../common/docorators/public.decorator';
import { S3Service } from '../../common/storage/s3.service';

@Crud({
    model: {
        type: Company,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {},
    },
})
@Controller()
export class SettingsController implements CrudController<Company> {
    constructor(
        public service: SettingsService,
        private readonly s3Service: S3Service,
    ) {
    }

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }

    @Post('upload-logo')
    @UseInterceptors(FileInterceptor('logo', {
        storage: memoryStorage(),
    }))
    async uploadLogo(@UploadedFile() logo, @Query() params, @Res() res, @Req() req) {
        if (!params.companyID) {
            res.status(500).send({
                error: 'UNDEFINED_COMPANY_ID',
            });
            return;
        }
        const filename = +new Date() + logo.originalname;
        await this.s3Service.putObjectCommand({
            type: logo.mimetype,
            buffer: logo.buffer,
            key: `uploads/${params.companyID}/images/${filename}`,
        });
        let urlHost = '';
        if (req.headers['x-forwarded-host']) {
            urlHost = `${req.protocol}://${req.headers['x-forwarded-host']}`;
        } else {
            urlHost = `http://${req.headers.host}`;
        }

        const downloadURL = `${urlHost}/system/settings/files/logo?companyID=${params.companyID}&logoName=${filename}`;
        res.send({ downloadURL });
    }

    @Get('files/logo')
    @Public()
    async getFile(@Query() params, @Res() res) {
        if (!params.companyID) {
            res.status(500).send({
                error: 'UNDEFINED_COMPANY_ID',
            });
            return;
        }
        if (!params.logoName) {
            res.status(500).send({
                error: 'UNDEFINED_LOGO_NAME',
            });
            return;
        }
        try {
            const logo = await this.s3Service.getObjectCommand(`uploads/${params.companyID}/images/${params.logoName}`);
            res.send(logo);
        } catch (e) {
            res.status(500).send({
                error: 'FILE_NOT_FOUND',
            });
        }
    }

    @Get('company/:uuid')
    async findCompanyByUuid(@Param() params, @Res() res) {
        try {

            const result = await this.service.findOne({
                where: {
                    uuid: params.uuid,
                },
                relations: ['defaultClient'],
            });
            if (result) {
                res.status(200);
                res.send(result);
            } else {
                res.status(400);
                res.send({
                    error: 'COMPANY_NOT_EXIST',
                });
            }
        } catch (e) {

            res.status(400);
            res.send({
                error: 'COMPANY_NOT_EXIST',
            });
        }
    }

    @Get('defaultCustomer/:uuid')
    async findDefaultCustormerByCompany(@Param() params, @Res() res) {
        const result = await this.service.findOne({
            where: {
                uuid: params.uuid,
            },
            relations: ['defaultClient'],
        });
        if (result) {
            res.status(200);
            res.send(result.defaultClient);
        } else {

            res.status(500);
            res.send({
                error: 'COMPANY_NOT_EXIST',
            });
        }
    }

}
