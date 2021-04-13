import { IQueryReport, ReportStructure } from '../interfaces/IQueryReport';
import * as Excel from 'exceljs';
import { Borders } from 'exceljs';
import * as moment from 'moment';

export class SchoolPaymentsReport {
  public generateReport(data: ReportStructure[], query: IQueryReport): Excel.Workbook {
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

  public addfilltoSheet(reportSheet: Excel.Worksheet, schoolPayments: ReportStructure[], query: IQueryReport): Excel.Worksheet {
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
    bussinessNameCell.value = 'COLEGIO';
    bussinessNameCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    reportTypeCell.value = 'TIPO DE REPORTE: Reporte de adeudos';
    reportTypeCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    dateRangeCell.value = `MES CONSULTADO: ${ query.month !== '' ? moment(query.month).format('MMM-YYYY') : 'Todo el ciclo escolar' }`;
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
      rowsItem.push(schoolPayment.level);
      rowsItem.push(schoolPayment.grade);
      rowsItem.push(schoolPayment.group);
      rowsItem.push(schoolPayment.statusPayment);
      rowsItem.push(schoolPayment.payDay);
      rowsItem.push(schoolPayment.description);
      rowsTable.push(rowsItem);
    });
    reportSheet.addTable({
      name: 'Report',
      ref: 'B7',
      style: {
        theme: 'TableStyleLight9',
        showColumnStripes: true,
      },
      headerRow: true,
      columns: [
        { name: 'Matricula', filterButton: true },
        { name: 'Nombre', filterButton: true },
        { name: 'Nivel', filterButton: true },
        { name: 'Grado', filterButton: true },
        { name: 'Grupo', filterButton: true },
        { name: 'Pago', filterButton: true },
        { name: 'Fecha de pago', filterButton: true },
        { name: 'Descripcion', filterButton: true },
      ],
      rows: rowsTable,
    });
    return reportSheet;
  }
}