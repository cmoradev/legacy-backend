import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import { formatDate } from './../../../../common/date';
import * as moment from 'moment';
import { IQueryReportSaleToday, IReportSaleTodayRow } from '../types/IReport';
import { getNameReport } from './helpers';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';

const esMx = require('moment/locale/es-mx');

export class SaleTodayExcel {
  private rows: IReportSaleTodayRow[] = [];
  private params: IQueryReportSaleToday;
  private workbook: Workbook;

  constructor(params: IQueryReportSaleToday, data: IReportSaleTodayRow[] = []) {
    this.rows = data;
    this.params = params;

    this.workbook = new Workbook();

    this.config();
    this.generate(
      this.addWorksheet(
        `${getNameReport('Ventas',this.params).excel}`,
      ),
    );
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
      properties: { tabColor: { argb: '1226AA' } },
    });
  }

  private generate(worksheet: Worksheet): Worksheet {
    let columns: TableColumnProperties[] = []
    if(this.params.status && this.params.status == PaymentStatus.trusted){
      columns = [
        { name: 'Matricula', filterButton: true },
        { name: 'Nombre', filterButton: false },
        { name: 'Fecha de creación', filterButton: true },
        { name: "Folio de venta",filterButton: false },      
        {
          name: 'Total de venta',
          filterButton: false,
          totalsRowLabel: 'Total',
          totalsRowFunction: 'sum',
        },
        { name: "Sucursal", filterButton: true },
        { name: "Ciclo", filterButton: true },
      ];
    }
    worksheet.mergeCells(`B2:K2`);
    const title = worksheet.getCell('B2');
    title.value = `Reporte de ${getNameReport('Ventas',this.params).title}`
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
    description.value = `Reporte emitido en ${moment().locale('es').format(
      'MMMM Do YYYY, h:mm:ss a',
    )}`;
    description.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    description.font = {
      bold: true,
      size: 12,
    };
    const rows = [];
    if(this.params.status && this.params.status == PaymentStatus.trusted){
      this.rows.forEach((value: IReportSaleTodayRow) => {
        const columns = [];
        columns.push(value.studentRegistration);
        columns.push(value.studentName);
        columns.push(formatDate(value.createdAt));
        columns.push(value.folio);
        columns.push(parseFloat(`${value.TotalDetalles}`));
        columns.push(value.plantel);
        columns.push(value.ciclo);
        rows.push(columns);
      });
    }
    worksheet.addTable({
      displayName: 'Reporte',
      name: 'Reporte',
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
      column.width = 10;

      if (column.letter === 'K') {
        column.numFmt = '$#,##0.00';
      }
      if (column.letter === 'C' || column.letter === 'J') {
        column.width = 45;
      }

      if (column.letter === 'K') {
        column.width = 15;
      }
    });

    return worksheet;
  }

  public getWorkBook(): Workbook {
    return this.workbook;
  }
}
