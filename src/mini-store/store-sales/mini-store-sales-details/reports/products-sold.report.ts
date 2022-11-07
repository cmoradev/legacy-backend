import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import * as moment from 'moment';
import { ReportProductsSoldRow } from '../types/productsSoldQuery';

const esMx = require('moment/locale/es-mx');

export class StoreProductsSoldReport {
  private rows: ReportProductsSoldRow[] = [];
  private workbook: Workbook;

  constructor(data: ReportProductsSoldRow[] = []) {
    this.rows = data;

    this.workbook = new Workbook();

    this.config();
    this.generate(this.addWorksheet(`productos_vendidos`));
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
        activeTab: 1,
        visibility: 'visible',
      },
    ];
  }

  private addWorksheet(name: string) {
    return this.workbook.addWorksheet(name, {
      properties: { tabColor: { argb: '359c5b' } },
    });
  }

  private generate(worksheet: Worksheet): Worksheet {
    let columns: TableColumnProperties[] = [];
    columns = [
      { name: 'Producto', filterButton: false },
      { name: 'Clasificación', filterButton: false },
      { name: 'Unidad' },
      { name: 'Vendidos' },
      { name: 'Total' },
    ];

    worksheet.mergeCells(`B2:K2`);
    const title = worksheet.getCell('B2');
    title.value = `Productos vendidos`;
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = {
      bold: true,
      size: 16,
    };
    worksheet.mergeCells(`B3:K3`);
    const description = worksheet.getCell('B3');
    moment?.updateLocale('es', esMx);
    description.value = `Reporte emitido el ${moment()
      .locale('es')
      .format('MMMM Do YYYY, h:mm:ss a')}`;
    description.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    description.font = {
      bold: true,
      size: 12,
    };
    const rows = [];

    this.rows.forEach((value: ReportProductsSoldRow) => {
      const columns = [];
      columns.push(value.product_name);
      columns.push(value.classifications_name);
      columns.push(value.vd_measurement_unit);
      columns.push(value.vd_quantity);
      columns.push(value.product_price);
      rows.push(columns);
    });
    worksheet.addTable({
      displayName: 'Report',
      name: 'Report',
      ref: 'B5',
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns,
      rows,
    });

    worksheet.columns.forEach((column) => {
      column.width = 15;

      if (column.letter === 'K') {
        column.numFmt = '$#,##0.00';
      }
      if (column.letter === 'C' || column.letter === 'J') {
        column.width = 45;
      }

      if (column.letter === 'K') {
        column.width = 20;
      }
    });

    return worksheet;
  }

  public getWorkBook(): Workbook {
    return this.workbook;
  }
}