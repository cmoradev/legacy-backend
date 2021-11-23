import { DataConverter } from '../../common/office/excel-tools/data-converter';
import { Workbook } from 'exceljs';

export async function templateProducts(workbook: Workbook, productData: any[]) {

  const sheet = workbook.addWorksheet('Layout', {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
    properties:
      {
        tabColor: {
          argb: '359c5b',
        },
      },
  });

  const columns = [];
  for (const field of productData) {
    columns.push({ header: field, key: field });
  }

  sheet.columns = columns;
  sheet.columns.forEach(column => {
    if (column) {
      column.width = column.header.length < 12 ? 12 : column.header.length;
      column.style.protection = { locked: false };
    }

  });
  sheet.protect('password', {
    selectUnlockedCells: true,
    deleteRows: true,
    deleteColumns: true,
    insertRows: true,
    formatColumns: true,
    formatCells: true,
  });
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber == 1) {
      row.eachCell((cell, cellNumber) => {
        cell.protection = {
          locked: true,
        };
        cell.style.alignment = { horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.style.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '3F6CAF' },
        };
        cell.font = {
          color: { argb: 'FFFFFF' },
        };
      });
    }
  });

  const converter = new DataConverter();
  return await converter.convert(workbook, { base64: true });
}
