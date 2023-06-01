import * as Excel from 'exceljs';
import { Borders } from 'exceljs';
import * as moment from 'moment';
import { AcademyReportStructure, IAcademyQueryReport } from '../interfaces/IQueryReport';

export class AcademyPaymentsReport {
  public generateReport(data: AcademyReportStructure[], query: IAcademyQueryReport): Excel.Workbook {
    const workBook = new Excel.Workbook();
    workBook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible',
      },
    ];
    const reportSheet = workBook.addWorksheet('Pagos', {
      properties:
        {
          tabColor: {
            argb: '359c5b',
          },
        },
    });
    this.addfilltoSheet(reportSheet, data, query);
    return workBook;
  }

  public addfilltoSheet(reportSheet: Excel.Worksheet, schoolPayments: AcademyReportStructure[], query: IAcademyQueryReport): Excel.Worksheet {
    reportSheet.mergeCells('C2:D2');
    reportSheet.mergeCells('C3:D3');
    reportSheet.mergeCells('C4:D4');
    reportSheet.mergeCells('C5:D5');
    const bussinessNameCell = reportSheet.getCell('C2');
    const reportTypeCell = reportSheet.getCell('C3');
    const dateRangeCell = reportSheet.getCell('C4');
    const dateOfIssueCell = reportSheet.getCell('C5');

    const borders = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
    };
    bussinessNameCell.value = 'ACADEMIAS';
    bussinessNameCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    reportTypeCell.value = 'TIPO DE REPORTE: Reporte de adeudos';
    reportTypeCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    dateRangeCell.value = `MES CONSULTADO: ${query.month !== '' ? moment(query.month).format('MMM-YYYY') : 'Todo el ciclo escolar'}`;
    dateRangeCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    dateOfIssueCell.value = 'FECHA DE EMISIÓN:' + new Date().toISOString().substr(0, 10);
    dateOfIssueCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    const rowsTable = [];
    schoolPayments.forEach((schoolPayment) => {
      const rowsItem = [];
      rowsItem.push(schoolPayment.enrollment);
      rowsItem.push(schoolPayment.clientName);
      rowsItem.push(schoolPayment.academy);
      rowsItem.push(schoolPayment.group);
      rowsItem.push(schoolPayment.statusPayment);
      rowsItem.push(schoolPayment.payDay);
      rowsItem.push(schoolPayment.description);
      rowsItem.push(schoolPayment.price);
      rowsTable.push(rowsItem);
    });
    reportSheet.addTable({
      name: 'Report',
      ref: 'B7',
      style: {
        theme: 'TableStyleLight9',
        showColumnStripes: true,
      },
      totalsRow: true,
      headerRow: true,
      columns: [
        { name: 'Matricula', filterButton: true },
        { name: 'Nombre', filterButton: true },
        { name: 'Academia', filterButton: true },
        { name: 'Grupo', filterButton: true },
        { name: 'Pago', filterButton: true },
        { name: 'Fecha de pago', filterButton: true },
        { name: 'Descripcion', filterButton: true },
        { name: 'Precio', filterButton: true, totalsRowLabel: 'Total', totalsRowFunction: 'sum' },
      ],
      rows: rowsTable,
    });

    reportSheet.columns.forEach((cell, colNumber) => {
      // tslint:disable-next-line:no-unused-expression
      colNumber === 1 ? cell.width = 15 : null;
      // tslint:disable-next-line:no-unused-expression
      colNumber === 2 ? cell.width = 30 : null;
      // tslint:disable-next-line:no-unused-expression
      if (colNumber >= 3 && colNumber < 8) {
        cell.width = 10;
      }
      // tslint:disable-next-line:no-unused-expression
      colNumber === 8 ? cell.width = 35 : null;
      // tslint:disable-next-line:no-unused-expression
      colNumber === 9 ? cell.width = 15 : null;
    });
    return reportSheet;
  }
}