import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook } from 'xlsx';

/**
 * TODO: borrar, es solo para pruebas
 */
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

@Controller('xls-importer')
export class XlsImporterController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './xls-imports');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file) {
        const uploadedFile = fs.readFileSync(file.path);
        const workBook = xlsx.read(uploadedFile);
        const persons = this.xlsWorkbookToJSON<Person>(workBook, {
            defaultValue: null,
            range: 'C11:E14',
            headers: ['firstName', 'lastName', 'age'],
        });
    }

    xlsWorkbookToJSON<T = any>(workBook: WorkBook, options: {
        range: string,
        defaultValue: any,
        headers: string[],
    }): T[] {
        const JSONWorkBook = [];
        Object.keys(workBook.Sheets).forEach((sheet) => {
            JSONWorkBook[sheet] = xlsx.utils.sheet_to_json<T>(
                workBook.Sheets[sheet],
                {
                    blankrows: true,
                    header: options.headers,
                    range: options.range,
                    defval: options.defaultValue,
                });
        });
        return JSONWorkBook;
    }
}
