import { IQueryReport, ReportStructure } from '../interfaces/IQueryReport';
import * as Excel from 'exceljs';

export class SchoolPaymentsReport {
  public generateReport(data: ReportStructure[], query: IQueryReport): Excel.Workbook {
    const workBook = new Excel.Workbook();
    workBook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible',
      },
    ];
    const image = workBook.addImage({
      filename: './public/colegiologo.png',
      extension: 'png',
    });
    const reportSheet = workBook.addWorksheet('Pagos', {
      properties:
        {
          tabColor: {
            argb: '359c5b',
          },
        },
    });
    this.addfilltoSheet(reportSheet, image, data, query);
    return workBook;
  }

  public addfilltoSheet(invoiceSheet: Excel.Worksheet, imageID, schoolPayments: ReportStructure[], query: any): Excel.Worksheet {
    invoiceSheet.addImage(imageID, { ext: { height: 100, width: 90 }, tl: { col: 1, row: 1 } });
    return invoiceSheet;
  }
}