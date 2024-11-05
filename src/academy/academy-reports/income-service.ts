import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { IncomeQuery } from './dto';
import { startOfDay, endOfDay, format } from 'date-fns';
import {
  incomeQuery,
  incomeWithPaymentMethodQuery,
  invoiceQuery,
} from './query';
import * as moment from 'moment';
import { ExcelDocument } from 'src/reports';
import { TableColumnProperties } from 'exceljs';
import { IncomeDetailsRow, IncomeRow, InvoiceRow } from './types';
import { InvoiceStatus } from 'src/invoice/types/invoice-status';
import { getPriceWithIva } from '../../common/functions';
import { Decimal } from '@munyaal/calculations';
const esMx = require('moment/locale/es-mx');

export class IncomeService {
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
  public async getData(query: IncomeQuery) {
    const incomes = await this.getDetailsOfIncome(query);

    const paymentIDs = Array.from(new Set(incomes.map((row) => row.id_pago)));
    const invoiceUUIDs = Array.from(
      new Set(
        incomes
          .filter((row) => !!row.uuid_factura)
          .map((row) => row.uuid_factura),
      ),
    );

    const invoices = await this.getInvoices(invoiceUUIDs, paymentIDs);

    const rows: IncomeDetailsRow[] = this.matchInvoicesToIncome(
      incomes,
      invoices,
    );

    const grouped = this.groupByMethodAndAgent(rows);

    const summary = this.buildSummary(rows, grouped);

    return {
      rows,
      summary,
    };
  }

  /**
   * Genera un documento Excel con los datos de ingresos por academias.
   * @param rows - Filas de ingresos por academias.
   * @param matriz - Matriz de resumen de ingresos por academias.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async buildDocument(
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
      { key: 'N', width: 40 },
      { key: 'O', width: 20 },
      { key: 'P', width: 20 },
      { key: 'Q', width: 20 },
      { key: 'R', width: 20 },
      { key: 'S', width: 20 },
    ];
    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:S${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Ingresos';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:S${lastRow}`);
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
      rows: data,
    });
    lastRow += data.length + 3;

    const dataColumns: TableColumnProperties[] = [
      { name: 'Matricula', filterButton: true },
      { name: 'Alumno', filterButton: true },
      { name: 'Folio Venta', filterButton: true },
      { name: 'Fecha Venta', filterButton: true },
      { name: 'Hora Venta', filterButton: false },
      { name: 'Folio Pago', filterButton: true },
      { name: 'Fecha Pago', filterButton: true },
      { name: 'Hora Pago', filterButton: false },
      { name: 'Folio Factura', filterButton: true },
      { name: 'Fecha Factura', filterButton: true },
      { name: 'Hora Factura', filterButton: false },
      { name: 'Tipo Factura', filterButton: true },
      { name: 'UUID Factura', filterButton: true },
      { name: 'Agente', filterButton: true },
      { name: 'Metodo de pago', filterButton: true },
      { name: 'Cobrado sin iva', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Cobrado', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => {
      const { amount, base, tax} = getPriceWithIva({base: new Decimal(row.cobrado), ivaPercentage: 0.16})
      return [
        row.matricula_alumno,
        row.nombre_alumno,
        row.folio_venta,
        format(row.fecha_venta, 'dd/MM/yyyy'),
        format(row.fecha_venta, 'pp'),
        row.folio_pago,
        format(row.fecha_pago, 'dd/MM/yyyy'),
        format(row.fecha_pago, 'pp'),
        row.folio_factura,
        row.fecha_factura != 'N/A'
          ? format(row.fecha_factura, 'dd/MM/yyyy')
          : row.fecha_factura,
        row.fecha_factura != 'N/A'
          ? format(row.fecha_factura, 'pp')
          : row.fecha_factura,
        row.tipo_factura,
        row.uuid_factura,
        row.nombre_agente,
        row.metodo_pago,
        parseFloat(amount.toFixed(2)),
        parseFloat(tax.toFixed(2)),
        parseFloat(base.toFixed(2)),
      ]
    });

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
   * Genera un documento Excel con los datos de ingresos de tienda.
   * @param rows - Filas de ingresos de tienda.
   * @param matriz - Matriz de resumen de ingresos de tienda.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async buildDocumentLite(
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
      { key: 'A', width: 4},
      { key: 'B', width: 12},
      { key: 'C', width: 12},
      { key: 'D', width: 12},
      { key: 'E', width: 12},
      { key: 'F', width: 12},
      { key: 'G', width: 20},
      { key: 'H', width: 10},
      { key: 'I', width: 10},
      { key: 'J', width: 10},
      { key: 'K', width: 10}
    ];

    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:K${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Ingresos';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:J${lastRow}`);
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
      rows: data,
    });

    worksheet.getRows(lastRow, (lastRow+data.length+rows.length)).forEach((row) => {
      row.alignment = { wrapText: true}
    });

    lastRow += data.length + 3;

    const dataColumns: TableColumnProperties[] = [
      { name: 'Folio Venta', filterButton: true },
      { name: 'Fecha y hora venta', filterButton: false },
      { name: 'Folio Pago', filterButton: true },
      { name: 'Fecha y hora pago', filterButton: false },
      { name: 'Matricula', filterButton: true },
      { name: 'Alumno', filterButton: true },
      { name: 'Metodo de pago', filterButton: true },
      { name: 'Cobrado sin iva', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Cobrado', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => {
      const { amount, base, tax} = getPriceWithIva({base: new Decimal(row.cobrado), ivaPercentage: 0.16})
      return [
        row.folio_venta,
        format(row.fecha_venta, 'dd/MM/yyyy pp'),
        row.folio_pago,
        format(row.fecha_pago, 'dd/MM/yyyy pp'),
        row.matricula_alumno,
        row.nombre_alumno,
        row.metodo_pago,
        parseFloat(amount.toFixed(2)),
        parseFloat(tax.toFixed(2)),
        parseFloat(base.toFixed(2)),
      ]
    });

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

    worksheet.pageSetup.orientation = 'landscape';
    // n / 2.54 centimetros entre pulgadas, excel dimensiona en pulgadas
    worksheet.pageSetup.margins.left = 1.5 / 2.54
    worksheet.pageSetup.margins.right = 1.5 / 2.54

    return excel;
  }

  /**
   * Obtiene los detalles de ventas entre un rango de fechas y un estado especifico.
   * @param query - Consulta de ingresos por academias.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsOfIncome(args: IncomeQuery): Promise<IncomeRow[]> {
    let { startDate, endDate } = args;

    let query = incomeQuery; // incomeWithPaymentMethodQuery

    const params: any[] = [
      startOfDay(`${startDate}T12:00:00`).toISOString(),
      endOfDay(`${endDate}T12:00:00`).toISOString(),
    ];

    if (!!args?.method) {
      query = incomeWithPaymentMethodQuery;
      params.push(parseInt(`${args.method}`));
    }

    const rows: IncomeRow[] = await this.connection.query(query, params);

    return rows.map((row) => ({
      ...row,
      id_alumno: parseInt(`${row.id_alumno}`),
      id_agente: parseInt(`${row.id_agente}`),
      id_pago: parseInt(`${row.id_pago}`),
      id_metodo_pago: parseInt(`${row.id_metodo_pago}`),
      id_venta: parseInt(`${row.id_venta}`),
      cobrado: parseFloat(`${row.cobrado}`),
      total_cobrado: parseFloat(`${row.total_cobrado}`),
      nombre_alumno: `${row.nombre_alumno}`
        .trim()
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
      nombre_agente: `${row.nombre_agente}`
        .trim()
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    }));
  }

  /**
   * Agrupa las filas de ingresos por método de pago y agente.
   *
   * @param rows - Un array de objetos `IncomeRow` que representan las filas de ingresos.
   * @returns Un objeto donde las claves son los métodos de pago y los valores son objetos
   *          que contienen los agentes como claves y los ingresos cobrados como valores.
   */
  private groupByMethodAndAgent(
    rows: IncomeRow[],
  ): { [method: string]: { [agent: string]: number } } {
    const incomeByAgentAndMethod = rows.reduce((acc, row) => {
      if (!acc[row.metodo_pago]) {
        acc[row.metodo_pago] = {};
      }
      if (!acc[row.metodo_pago][row.nombre_agente]) {
        acc[row.metodo_pago][row.nombre_agente] = 0;
      }
      acc[row.metodo_pago][row.nombre_agente] += row.cobrado;
      return acc;
    }, {} as { [method: string]: { [agent: string]: number } });

    return incomeByAgentAndMethod;
  }

  /**
   * Construye un resumen de ingresos agrupados por método de pago y agente.
   *
   * @param rows - Arreglo de objetos `IncomeRow` que contienen los datos de ingresos.
   * @param grouped - Objeto que agrupa los ingresos por método de pago y agente.
   * @returns Un objeto que contiene los encabezados y los datos del resumen.
   *
   * @example
   * ```typescript
   * const rows = [
   *   { nombre_agente: 'Agente1', ... },
   *   { nombre_agente: 'Agente2', ... },
   * ];
   * const grouped = {
   *   'Efectivo': { 'Agente1': 100, 'Agente2': 200 },
   *   'Tarjeta': { 'Agente1': 150, 'Agente2': 250 },
   * };
   * const summary = buildSummary(rows, grouped);
   * console.log(summary.headers); // ['Metodo de Pago', 'Agente1', 'Agente2']
   * console.log(summary.data); // [['Efectivo', 100, 200], ['Tarjeta', 150, 250]]
   * ```
   */
  private buildSummary(
    rows: IncomeRow[],
    grouped: {
      [method: string]: {
        [agent: string]: number;
      };
    },
  ) {
    let total = 0;
    const agents = Array.from(new Set(rows.map((row) => row.nombre_agente)));

    const headers: string[] = ['Metodo de Pago', ...agents, 'Total'];

    const data = [];

    for (const method in grouped) {
      if (grouped.hasOwnProperty(method)) {
        const methodDetials = grouped[method];

        const row: any[] = [method];

        for (const agent of agents) {
          if (methodDetials.hasOwnProperty(agent)) {
            const amount = methodDetials[agent];
            row.push(amount);
            total += amount;
          } else {
            row.push(0);
          }
        }

        data.push(row);
      }
    }

    for (let index = 0; index < data.length; index++) {
      const total = data[index].filter((value) => typeof value == 'number').reduce((previousValue, currentValue) => {
        return (
          previousValue + currentValue
        );
      }, 0);

      data[index].push(total)
    }

    return {
      headers,
      data,
      total,
    };
  }

  /**
   * Obtiene las facturas basadas en los UUIDs y los IDs de pago proporcionados.
   *
   * @param {string[]} uuids - Lista de UUIDs de las facturas.
   * @param {number[]} paymentIds - Lista de IDs de los pagos.
   * @returns {Promise<InvoiceRow[]>} - Promesa que resuelve a una lista de filas de facturas.
   *
   * @remarks
   * Este método construye una consulta SQL utilizando los UUIDs y los IDs de pago proporcionados,
   * ejecuta la consulta y luego mapea los resultados a objetos `InvoiceRow`.
   *
   * @example
   * ```typescript
   * const uuids = ['uuid1', 'uuid2'];
   * const paymentIds = [1, 2];
   * const invoices = await getInvoices(uuids, paymentIds);
   * console.log(invoices);
   * ```
   */
  private async getInvoices(
    uuids: string[],
    paymentIds: number[],
  ): Promise<InvoiceRow[]> {
    if (paymentIds.length === 0) {
      return [];
    }

    let query = invoiceQuery.replace(
      '@paymentIds',
      paymentIds.map(() => '?').join(','),
    );

    if (!!uuids.length) {
      query += 'OR f.uuid IN (@uuids)'.replace(
        '@uuids',
        uuids.map(() => '?').join(','),
      );
    }

    const rows = await this.connection.query(query, [...paymentIds, ...uuids]);

    return rows.map(
      (row): InvoiceRow => ({
        ...row,
        estado_factura: parseInt(`${row.estado_factura}`) as InvoiceStatus,
        global_factura:
          `${row.global_factura}` == '0'
            ? 'Factura global'
            : 'Factura individual',
        id_factura: parseInt(`${row.id_factura}`),
        id_pago: parseInt(`${row.id_pago}`),
      }),
    );
  }

  /**
   * Empareja las filas de ingresos con las facturas correspondientes.
   *
   * @param {IncomeRow[]} rows - Las filas de ingresos a procesar.
   * @param {InvoiceRow[]} invoices - Las filas de facturas disponibles para emparejar.
   * @returns {IncomeDetailsRow[]} - Una lista de filas de ingresos con detalles de facturas emparejadas.
   *
   * @remarks
   * Este método toma una lista de filas de ingresos y una lista de facturas, y trata de emparejar cada fila de ingresos
   * con una factura correspondiente basada en el `id_pago` o el `uuid_factura`. Si se encuentra una coincidencia, se
   * agregan los detalles de la factura a la fila de ingresos; de lo contrario, se asignan valores predeterminados.
   */
  private matchInvoicesToIncome(
    rows: IncomeRow[],
    invoices: InvoiceRow[],
  ): IncomeDetailsRow[] {
    return rows.map(
      (row): IncomeDetailsRow => {
        let invoice = invoices.find(
          (invoice) => invoice.id_pago === row.id_pago,
        );

        if (!invoice) {
          invoice = invoices.find(
            (value) => value.uuid_factura === row.uuid_factura,
          );
        }

        let uuid_factura = 'N/A';
        let folio_factura = 'N/A';
        let fecha_factura = 'N/A';
        let tipo_factura = 'N/A';

        if (invoice) {
          uuid_factura = invoice.uuid_factura;
          folio_factura = invoice.folio_factura;
          fecha_factura = invoice.fecha_factura;
          tipo_factura = invoice.global_factura;
        }

        return {
          ...row,
          uuid_factura,
          folio_factura,
          fecha_factura,
          tipo_factura,
        };
      },
    );
  }
}
