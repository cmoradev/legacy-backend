import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { SchoolIncomeQuery as incomeQuery } from './dto';
import { startOfDay, endOfDay } from 'date-fns';
import * as moment from 'moment';
import { SchoolIncomeDetailsRow, SchoolIncomeRow, SchoolInvoiceRow } from './types';
import { SchoolIncomeQuery, SchoolIncomeWithPaymentMethodQuery, SchoolInvoiceQuery } from './query';
import { InvoiceStatus } from '../../invoice/types/invoice-status';
import { TableColumnProperties } from 'exceljs';
import { ExcelDocument } from '../../reports/excel.document';
import { Decimal } from '@munyaal/calculations';
import { getPriceWithIva } from '../../common/functions';
const esMx = require('moment/locale/es-mx');

export class SchoolIncomeService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos del modulo de colegio.
   * @param query - Consulta de ingresos de colegio.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async getData(query: incomeQuery) {
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

    const rows: SchoolIncomeDetailsRow[] = this.matchInvoicesToIncome(
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
   * Genera un documento Excel con los datos de ingresos de colegio.
   * @param rows - Filas de ingresos.
   * @param matriz - Matriz de resumen de ingresos de colegio.
   * @returns Un documento Excel con los datos de ingresos.
   */
    public async buildDocument(
      rows: SchoolIncomeDetailsRow[],
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
        { key: 'O', width: 20 },
        { key: 'P', width: 20 },
      ];
      let lastRow = 2;
      worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
      const title = worksheet.getCell(`B${lastRow}`);
      title.value = 'Ingresos colegio';
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
   * Obtiene los detalles de ventas entre un rango de fechas y un estado especifico.
   * @param query - Consulta de ingresos del colegio.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsOfIncome(args: incomeQuery): Promise<SchoolIncomeRow[]> {
    let { startDate, endDate } = args;

    let query = SchoolIncomeQuery; // incomeWithPaymentMethodQuery

    const params: any[] = [
      startOfDay(`${startDate}T12:00:00`).toISOString(),
      endOfDay(`${endDate}T12:00:00`).toISOString(),
    ];

    if (!!args?.method) {
      query = SchoolIncomeWithPaymentMethodQuery;
      params.push(parseInt(`${args.method}`));
    }

    const rows: SchoolIncomeRow[] = await this.connection.query(query, params);

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
  ): Promise<SchoolInvoiceRow[]> {
    if (paymentIds.length === 0) {
      return [];
    }

    let query = SchoolInvoiceQuery.replace(
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
      (row): SchoolInvoiceRow => ({
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
    rows: SchoolIncomeRow[],
    invoices: SchoolInvoiceRow[],
  ): SchoolIncomeDetailsRow[] {
    return rows.map(
      (row): SchoolIncomeDetailsRow => {
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

  /**
   * Agrupa las filas de ingresos por método de pago y agente.
   *
   * @param rows - Un array de objetos `IncomeRow` que representan las filas de ingresos.
   * @returns Un objeto donde las claves son los métodos de pago y los valores son objetos
   *          que contienen los agentes como claves y los ingresos cobrados como valores.
   */
  private groupByMethodAndAgent(
    rows: SchoolIncomeRow[],
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
    rows: SchoolIncomeRow[],
    grouped: {
      [method: string]: {
        [agent: string]: number;
      };
    },
  ) {
    let total = 0;
    const agents = Array.from(new Set(rows.map((row) => row.nombre_agente)));

    const headers: string[] = ['Metodo de Pago', ...agents];

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

    return {
      headers,
      data,
      total,
    };
  }
}
