import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import { formatDate } from './../../../common/date';
import { IAcademyQueryReportConcept, IAcademyReportConceptRow } from '../interfaces/IQueryReport';
import * as moment from 'moment';
import { getNameStatusConcept } from '../../../school-colegio-ingles/school-payments/report/helpers';

const esMx = require('moment/locale/es-mx');

export class ConceptStatusExcel {
  private rows: IAcademyReportConceptRow[] = [];
  private params: IAcademyQueryReportConcept;
  private workbook: Workbook;

  constructor(params: IAcademyQueryReportConcept, data: IAcademyReportConceptRow[] = []) {
    this.rows = data;
    this.params = params;

    this.workbook = new Workbook();

    this.config();
    this.generate(
      this.addWorksheet(
        `${getNameStatusConcept(parseInt(`${this.params.conceptStatus}`))}s`,
      ),
    );
  }

  private config(): void {
    this.workbook.creator = 'Munyaal Academic';
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
    const columns: TableColumnProperties[] = [
      { name: 'Matricula', filterButton: false },
      { name: 'Nombre', filterButton: false },
      { name: 'Academia', filterButton: true },
      { name: 'Grupo', filterButton: true },
      { name: 'Estatus', filterButton: true },
      { name: 'Pagado en', filterButton: false },
      { name: 'Paga el', filterButton: false },
      { name: 'Concepto de pago', filterButton: true },
      {
        name: 'Precio',
        filterButton: false,
        totalsRowLabel: 'Total',
        totalsRowFunction: 'sum',
      },
    ];

    worksheet.mergeCells(`B2:K2`);
    const title = worksheet.getCell('B2');
    title.value = `REPORTE DE ${getNameStatusConcept(
      parseInt(`${this.params.conceptStatus}`),
    )}S`.toUpperCase();
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

    this.rows.forEach((value: IAcademyReportConceptRow) => {
      const columns = [];
      columns.push(value.studentRegistration);
      columns.push(value.studentName);
      columns.push(value.academyName);
      columns.push(value.groupName);
      columns.push(getNameStatusConcept(parseInt(value?.conceptStatus)));
      columns.push(value.conceptPaid ? formatDate(value.conceptPaid) : '');
      columns.push(formatDate(value.conceptPay));
      columns.push(value.conceptName);
      columns.push(parseFloat(`${value.conceptPrice}`));
      rows.push(columns);
    });

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
