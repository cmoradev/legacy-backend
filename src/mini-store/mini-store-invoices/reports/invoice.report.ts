import * as Excel from 'exceljs';
import { Borders } from 'exceljs';
import { InvoiceReport } from '../../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { InvoiceCompany } from '../../../invoice/invoice-company/entities/invoice-company.entity';
import moment = require('moment');

export class ReportInvoice {
  public generateReport(data: InvoiceReport[], query: { startDate: string, endDate: string }, company: InvoiceCompany): Excel.Workbook {
    const workbook = new Excel.Workbook();
    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible',
      },
    ];
    const image = workbook.addImage({
      filename: './public/images/little-store-logo.png',
      extension: 'png',
    });
    const invoiceSheet = workbook.addWorksheet('Faturas', {
      properties:
        {
          tabColor: {
            argb: '359c5b',
          },
        },
    });
    this.addfilltoSheet(invoiceSheet, image, data, query, company);
    return workbook;
  }

  public addfilltoSheet(invoiceSheet: Excel.Worksheet, imageID, invoices: InvoiceReport[], query: any, company: InvoiceCompany): Excel.Worksheet {

    invoiceSheet.addImage(imageID, { ext: { height: 100, width: 90 }, tl: { col: 1, row: 1 } });
    invoiceSheet.mergeCells('C2:D2');
    invoiceSheet.mergeCells('C3:D3');
    invoiceSheet.mergeCells('C4:D4');
    invoiceSheet.mergeCells('C5:D5');

    const bussinessNameCell = invoiceSheet.getCell('C2');
    const reportTypeCell = invoiceSheet.getCell('C3');
    const dateRangeCell = invoiceSheet.getCell('C4');
    const dateOfIssueCell = invoiceSheet.getCell('C5');

    const borders = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
    };

    bussinessNameCell.value = company.businessName;
    bussinessNameCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    reportTypeCell.value = 'TIPO DE REPORTE: Reporte de Facturas';
    reportTypeCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    dateRangeCell.value = `RANGO CONSULTADO: ${moment(query.startDate).format('DD-MM-YYYY')} a ${moment(query.endDate).format('DD-MM-YYYY')}`;
    dateRangeCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    dateOfIssueCell.value = 'FECHA DE EMISIÓN:' + new Date().toISOString().substr(0, 10);
    dateOfIssueCell.style = {
      border: borders as Partial<Borders>,
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    const invoiceDetails = [];
    invoices.forEach((invoice) => {
      const invoiceItem = [];
      invoiceItem.push(invoice.status);
      invoiceItem.push(invoice.billingDate);
      invoiceItem.push(invoice.payDay);
      invoiceItem.push(invoice.folioInvoice);
      invoiceItem.push(invoice.paymentFolio);
      invoiceItem.push(invoice.folioSale);
      invoiceItem.push(invoice.typePerson);
      invoiceItem.push(invoice.studentName);
      invoiceItem.push(invoice.billingAgent);
      invoiceItem.push(invoice.businessName);
      invoiceItem.push(invoice.rfc);
      invoiceItem.push(invoice.paymentForm);
      invoiceItem.push(invoice.total);
      invoiceItem.push(invoice.uuid);
      invoiceItem.push(invoice.typeInvoice);
      invoiceDetails.push(invoiceItem);
    });
    invoiceSheet.addTable({
      name: 'details',
      ref: 'B14',
      totalsRow: true,
      columns: [
        { name: 'ESTADO', filterButton: false },
        { name: 'FECHA DE FACTURACION' },
        { name: 'DIA DE PAGO' },
        { name: 'FOLIO DE FACTURA' },
        { name: 'FOLIO DE PAGO' },
        { name: 'FOLIO DE VENTA' },
        { name: 'PERSONA' },
        { name: 'ALUMNO/CLIENTE' },
        { name: 'FACTURADOR' },
        { name: 'RAZON SOCIAL' },
        { name: 'RFC' },
        { name: 'METODO DE PAGO' },
        { name: 'TOTAL', totalsRowFunction: 'sum' },
        { name: 'UUID' },
        { name: 'TIPO DE FACTURA' },
      ],
      rows: invoiceDetails,
    });

    for (let row = 14; row < invoiceDetails.length + 16; row++) {
      invoiceSheet.getRow(row).eachCell((cell, colNumber) => {
        if (colNumber > 1 && colNumber < 17) {
          cell.style = {
            ...cell.style,
            border: borders as Partial<Borders>,
            alignment: { horizontal: 'center', vertical: 'middle' },
          };
        }

        if (colNumber === 14) {
          cell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
        }
      });
    }
    invoiceSheet.getRow(14).eachCell((cell, colNumber) => {
      if (colNumber > 1 && colNumber < 17) {
        invoiceSheet.getColumn(colNumber).width = 20;
        // tslint:disable-next-line:no-unused-expression
        colNumber === 2 ? invoiceSheet.getColumn(colNumber).width = 20 : '';
        // tslint:disable-next-line:no-unused-expression
        colNumber === 9 ? invoiceSheet.getColumn(colNumber).width = 50 : '';
        // tslint:disable-next-line:no-unused-expression
        colNumber === 10 ? invoiceSheet.getColumn(colNumber).width = 50 : '';
        // tslint:disable-next-line:no-unused-expression
        colNumber === 11 ? invoiceSheet.getColumn(colNumber).width = 50 : '';
        // tslint:disable-next-line:no-unused-expression
        colNumber === 14 ? invoiceSheet.getColumn(colNumber).width = 10 : '';
        // tslint:disable-next-line:no-unused-expression
        colNumber === 15 ? invoiceSheet.getColumn(colNumber).width = 50 : '';
        cell.style = {
          border: borders as Partial<Borders>,
          alignment: { horizontal: 'center' },
          font: {
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            size: 14,
          },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '1E88E5' },
            bgColor: { argb: '1E88E5' },
          },
        };
      }
    });

    return invoiceSheet;
  }
}
