import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { startOfDay, endOfDay } from 'date-fns';
import * as moment from 'moment';
import { ExcelDocument } from 'src/reports';
import { TableColumnProperties } from 'exceljs';
import { InvoiceStatus } from 'src/invoice/types/invoice-status';
import { MiniStoreIncomeQuery as IncomeQuery } from './dto';
import { MiniStoreIncomeDetailsRow, MiniStoreIncomeRow, MiniStoreInvoiceRow } from './types';
import { MiniStoreIncomeQuery, MiniStoreIncomeWithPaymentMethodQuery, MiniStoreInvoiceQuery } from './query/mini-store-income-query';
const esMx = require('moment/locale/es-mx');

export class MiniStoreIncomeService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos de tienda.
   * @param query - Consulta de ingresos de tienda.
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

    const rows: MiniStoreIncomeDetailsRow[] = this.matchInvoicesToIncome(
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
   * Genera un documento Excel con los datos de ingresos de tienda.
   * @param rows - Filas de ingresos de tienda.
   * @param matriz - Matriz de resumen de ingresos de tienda.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async buildDocument(
    rows: MiniStoreIncomeDetailsRow[],
    summary: {
      headers: string[];
      data: any[];
      total: number;
    },
  ) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Ingresos tienda');

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
   * @param query - Consulta de ingresos de tienda.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsOfIncome(args: IncomeQuery): Promise<MiniStoreIncomeRow[]> {
    let { startDate, endDate } = args;

    let query = MiniStoreIncomeQuery;

    const params: any[] = [
      startOfDay(`${startDate}T12:00:00`).toISOString(),
      endOfDay(`${endDate}T12:00:00`).toISOString(),
    ];

    if (!!args?.method) {
      query = MiniStoreIncomeWithPaymentMethodQuery;
      params.push(parseInt(`${args.method}`));
    }

    const rows: MiniStoreIncomeRow[] = await this.connection.query(query, params);

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
    rows: MiniStoreIncomeRow[],
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
   */
  private buildSummary(
    rows: MiniStoreIncomeRow[],
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
  ): Promise<MiniStoreInvoiceRow[]> {
    if (paymentIds.length === 0) {
      return [];
    }

    let query = MiniStoreInvoiceQuery.replace(
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
      (row): MiniStoreInvoiceRow => ({
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
   * @returns {MiniStoreIncomeDetailsRow[]} - Una lista de filas de ingresos con detalles de facturas emparejadas.
   *
   * @remarks
   * Este método toma una lista de filas de ingresos y una lista de facturas, y trata de emparejar cada fila de ingresos
   * con una factura correspondiente basada en el `id_pago` o el `uuid_factura`. Si se encuentra una coincidencia, se
   * agregan los detalles de la factura a la fila de ingresos; de lo contrario, se asignan valores predeterminados.
   */
  private matchInvoicesToIncome(
    rows: MiniStoreIncomeRow[],
    invoices: MiniStoreInvoiceRow[],
  ): MiniStoreIncomeDetailsRow[] {
    return rows.map(
      (row): MiniStoreIncomeDetailsRow => {
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
