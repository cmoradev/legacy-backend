import { Workbook } from 'exceljs';

export class DataConverter {
    async convert(workbook: Workbook, options?: { base64: boolean, fileName?: string }): Promise<string> {
        try {
            const fileName = options && options.fileName + '.xlsx' || (+new Date()).toString() + '.xlsx';
            if (options && options.base64) {
                const result = await workbook.xlsx.writeBuffer({
                        filename: (+new Date()).toString() + '.xlsx',
                    },
                );
                const buffer = Buffer.from(result);
                const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                return b64Encoding + buffer.toString('base64');

            }
            await workbook.xlsx.writeFile('./xls-imports/' + fileName);
            return fileName;
        } catch (e) {
            return e;
        }
    }
}
