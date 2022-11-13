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
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { Crud, CrudController } from '@nestjsx/crud';
import { Company } from './entities/company.entity';
import { SettingsService } from './settings.service';
import { Public } from '../../common/docorators/public.decorator';

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
    constructor(public service: SettingsService) {
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
        storage: diskStorage({
            destination: '/var/www/uploads/temp',
            filename(req, file, cb): void {
                const uniqueName = +new Date();
                cb(null, uniqueName + file.originalname);
            },
        }),
    }))
    async uploadLogo(@UploadedFile() logo, @Query() params, @Res() res, @Req() req) {
        if (!params.companyID) {
            res.status(500).send({
                error: 'UNDEFINED_COMPANY_ID',
            });
        }
        const companyPaths = [`/var/www/uploads/${params.companyID}/`, `/var/www/uploads/${params.companyID}/images/`];
        for (const path of companyPaths) {
            try {
                await fs.promises.mkdir(path);
            } catch (e) {
                // err
            }
        }
        fs.rename(logo.path, `/var/www/uploads/${params.companyID}/images/` + logo.filename, (err) => {
            // err
        });
        let urlHost = '';
        if (req.headers['x-forwarded-host']) {
            urlHost = `${req.protocol}://${req.headers['x-forwarded-host']}`;
        } else {
            urlHost = `http://${req.headers.host}`;
        }

        const downloadURL = `${urlHost}/system/settings/files/logo?companyID=${params.companyID}&logoName=${logo.filename}`;
        res.send({ downloadURL });
    }

    @Get('files/logo')
    @Public()
    async getFile(@Query() params, @Res() res) {
        if (!params.companyID) {
            res.status(500).send({
                error: 'UNDEFINED_COMPANY_ID',
            });
        }
        if (!params.logoName) {
            res.status(500).send({
                error: 'UNDEFINED_LOGO_NAME',
            });
        }
        const companyPath = `/var/www/uploads/${params.companyID}/images`;
        try {
            const logo = await fs.promises.readFile(`${companyPath}/${params.logoName}`);
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
