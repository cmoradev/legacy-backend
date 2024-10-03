import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import * as moment from 'moment';
import { AcademyIncomeRow } from 'src/academy/charges-academy/academy-charge-payments/types/academy.income.row.type';

const esMx = require('moment/locale/es-mx');

export class ExcelIncomeAcademy {
  private readonly rows: AcademyIncomeRow[] = [];
  private readonly matriz: { [key: string]: number };
  private readonly workbook: Workbook;

  constructor(rows: AcademyIncomeRow[], matriz: { [key: string]: number }) {
    this.rows = rows;
    this.matriz = matriz;

    this.workbook = new Workbook();

    const worksheet = this.addWorksheet(`Ingresos por academias`);

    this.config();

    this.generate(worksheet);
  }

  private config(): void {
    this.workbook.creator = 'Munyaal';
    this.workbook.created = new Date();

    this.workbook.views = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 0,
        visibility: 'visible',
      },
    ];
  }

  private addWorksheet(name: string) {
    return this.workbook.addWorksheet(name, {
      properties: { tabColor: { argb: '1226AA' } },
    });
  }

  private generate(worksheet: Worksheet): Worksheet {
    moment?.updateLocale('es', esMx);

    worksheet.columns = [
      { key: 'A', width: 20 },
      { key: 'B', width: 20 },
      { key: 'C', width: 20 },
      { key: 'D', width: 20 },
      { key: 'E', width: 20 },
      { key: 'F', width: 20 },
      { key: 'G', width: 20 },
      { key: 'H', width: 20 },
      { key: 'I', width: 20 },
      { key: 'J', width: 20 },
      { key: 'K', width: 20 },
    ];

    worksheet.mergeCells(`B2:K2`);
    const title = worksheet.getCell('B2');
    title.value = 'Ingresos por academias';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = {
      bold: true,
      size: 16,
    };

    worksheet.mergeCells(`B3:K3`);
    const description = worksheet.getCell('B3');
    description.value = `Reporte emitido en ${moment()
      .locale('es')
      .format('MMMM Do YYYY, h:mm:ss a')}`;
    description.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    description.font = {
      bold: true,
      size: 12,
    };

    const columnsMatriz: TableColumnProperties[] = [
      { name: 'Academia', filterButton: false },
      { name: 'Ingreso', filterButton: false },
    ];

    const rowsMatriz = Object.entries(
      this.matriz,
    ).map(([academia, ingreso]) => [academia, ingreso]);

    worksheet.addTable({
      displayName: 'Resumen',
      name: 'Resumen',
      ref: `B5`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: columnsMatriz,
      rows: rowsMatriz,
    });

    const sumRow = rowsMatriz.length + 5;

    // Add sum formula to the last row of the 'Ingreso' column
    const summaryLastRow = worksheet.getRow(rowsMatriz.length + 6);
    summaryLastRow.getCell(3).value = {
      formula: `SUM(C6:C${sumRow})`,
      date1904: false,
    };
    summaryLastRow.commit();

    const columns: TableColumnProperties[] = [
      { name: 'ID Venta', filterButton: false },
      { name: 'Folio Venta', filterButton: false },
      { name: 'Fecha Venta', filterButton: true },
      { name: 'ID Pago', filterButton: false },
      { name: 'Folio Pago', filterButton: false },
      { name: 'Fecha Pago', filterButton: true },
      { name: 'Academia', filterButton: true },
      { name: 'Concepto', filterButton: false },
      { name: 'Cobrado', filterButton: false },
    ];

    const rows = this.rows.map((row) => [
      row.id_venta,
      row.folio_venta,
      row.fecha_venta,
      row.id_pago,
      row.folio_pago,
      row.fecha_pago,
      row.academia,
      row.concepto,
      parseFloat(row.cobrado),
    ]);

    worksheet.addTable({
      displayName: 'Datos',
      name: 'Datos',
      ref: `B${rowsMatriz.length + 8}`,
      totalsRow: false,
      headerRow: true,
      style: {
      theme: 'TableStyleLight9',
      showRowStripes: true,
      showColumnStripes: true,
      },
      columns,
      rows,
    });

    // Add sum formula to the last row of the 'Ingreso' column
    const lastRow = worksheet.getRow(rows.length + sumRow + 4);

    lastRow.getCell(10).value = {
      formula: `SUM(J${rowsMatriz.length + 9}:J${
      rows.length + sumRow + 3
      })`,
      date1904: false,
    };

    lastRow.commit();

    return worksheet;
  }

  public getWorkBook(): Workbook {
    return this.workbook;
  }
}
