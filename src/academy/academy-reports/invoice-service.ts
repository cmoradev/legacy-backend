import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { IncomeQuery, InvoiceQuery } from './dto';
import { startOfDay, endOfDay } from 'date-fns';
import { detailInvoiceQuery } from './query';
import * as moment from 'moment';
import { ExcelDocument } from 'src/reports';
import { TableColumnProperties } from 'exceljs';
import { IncomeDetailsRow, IncomeRow, InvoiceRow } from './types';
import { InvoiceStatus } from 'src/invoice/types/invoice-status';
const esMx = require('moment/locale/es-mx');

export class InvoiceService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async incomeData(query: InvoiceQuery) {
    const invoices = await this.getInvoices(query);

    // const paymentIDs = Array.from(new Set(incomes.map((row) => row.id_pago)));
    // const invoiceUUIDs = Array.from(
    //   new Set(
    //     incomes
    //       .filter((row) => !!row.uuid_factura)
    //       .map((row) => row.uuid_factura),
    //   ),
    // );

    // const invoices = await this.getInvoices(invoiceUUIDs, paymentIDs);

    // const rows: IncomeDetailsRow[] = this.matchInvoicesToIncome(
    //   incomes,
    //   invoices,
    // );

    // const grouped = this.groupByMethodAndAgent(rows);

    // const summary = this.buildSummary(rows, grouped);

    return {
      // rows,
      // summary,
    };
  }

  /**
   * Genera un documento Excel con los datos de ingresos por academias.
   * @param rows - Filas de ingresos por academias.
   * @param matriz - Matriz de resumen de ingresos por academias.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async academyIncomeDocument(
    rows: IncomeDetailsRow[],
    summary: {
      headers: string[];
      data: any[];
      total: number;
    },
  ) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Ingresos');

    worksheet.columns = [
      { key: 'A', width: 10 },
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
      { key: 'L', width: 20 },
      { key: 'M', width: 20 },
      { key: 'N', width: 20 },
    ];
    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Ingresos';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    subtitle.value = `Reporte emitido en ${moment()
      .locale('es')
      .format('lll')}`;
    subtitle.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    subtitle.font = { bold: true, size: 12 };
    lastRow += 2;

    const { headers, data } = summary;

    const summaryColumns: TableColumnProperties[] = headers.map(
      (header, index) => {
        const column: TableColumnProperties = {
          name: header,
          filterButton: false,
        };

        if (index >= 1) {
          Object.assign(column, {
            totalsRowFunction: 'sum',
          });
        }

        return column;
      },
    );

    summaryColumns.push({
      name: 'Total',
      filterButton: false,
      totalsRowFunction: 'sum',
    });

    const summaryRows = data.map((row) => {
      const rowTotal = row.slice(1).reduce((acc, value) => acc + value, 0);
      return [...row, rowTotal];
    });

    worksheet.addTable({
      displayName: 'Resumen',
      name: 'Resumen',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: summaryColumns,
      rows: summaryRows,
    });
    lastRow += summaryRows.length + 3;

    const dataColumns: TableColumnProperties[] = [
      { name: 'Matricula', filterButton: false },
      { name: 'Alumno', filterButton: false },
      { name: 'Folio Venta', filterButton: false },
      { name: 'Fecha Venta', filterButton: false },
      { name: 'Folio Pago', filterButton: false },
      { name: 'Fecha Pago', filterButton: false },
      { name: 'Folio Factura', filterButton: false },
      { name: 'Fecha Factura', filterButton: false },
      { name: 'Tipo Factura', filterButton: false },
      { name: 'UUID Factura', filterButton: false },
      { name: 'Agente', filterButton: true },
      { name: 'Metodo de pago', filterButton: true },
      { name: 'Cobrado', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => [
      row.matricula_alumno,
      row.nombre_alumno,
      row.folio_venta,
      moment(row.fecha_venta).format('lll'),
      row.folio_pago,
      moment(row.fecha_pago).format('lll'),
      row.folio_factura,
      row.fecha_factura != 'N/A'
        ? moment(row.fecha_factura).format('lll')
        : row.fecha_factura,
      row.tipo_factura,
      row.uuid_factura,
      row.nombre_agente,
      row.metodo_pago,
      row.cobrado,
    ]);

    worksheet.addTable({
      displayName: 'Datos',
      name: 'Datos',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: dataColumns,
      rows: dataRows,
    });

    return excel;
  }

  /**
   * Obtiene los detalles de ventas entre un rango de fechas y un estado especifico.
   * @param query - Consulta de ingresos por academias.
   * @returns Una lista de detalles de ingresos.
   */
  private async getInvoices(args: InvoiceQuery): Promise<InvoiceRow[]> {
    let { startDate, endDate } = args;

    const params: any[] = [
      `${args?.invoiceStatus}`,
      startOfDay(`${startDate}T12:00:00`).toISOString(),
      endOfDay(`${endDate}T12:00:00`).toISOString(),
    ];

    const rows: InvoiceRow[] = await this.connection.query(
      detailInvoiceQuery,
      params,
    );

    return rows.map((row) => ({
      ...row,
      id_factura: parseInt(`${row.id_factura}`),
      id_pago: parseInt(`${row.id_pago}`),
      total_factura: parseFloat(`${row.total_factura}`),
    }));
  }
}
