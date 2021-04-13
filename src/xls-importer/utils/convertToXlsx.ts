import { Workbook } from 'exceljs';

export async function convertToXlsx(workBook: Workbook) {
    const filename = (+new Date()).toString() + '.xlsx';
    const file = await workBook.xlsx.writeBuffer({
        filename: filename,
    });
    const buffer = Buffer.from(file);
    const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
    return b64Encoding + buffer.toString('base64');
}