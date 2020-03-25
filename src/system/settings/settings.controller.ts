import { Controller, Get, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller()
export class SettingsController {
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
            console.log(err);
        });
        const downloadURL = `${req.headers.host}/system/settings/files/logo?companyID=${params.companyID}&logoName=${logo.filename}`;
        res.send({
            downloadURL,
        });
    }

    @Get('files/logo')
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
}
