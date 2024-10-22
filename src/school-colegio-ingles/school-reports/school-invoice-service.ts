import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { SchoolInvoiceQuery as InvoiceQuery } from './dto';
import { startOfDay, endOfDay } from 'date-fns';
import * as moment from 'moment';
import { ExcelDocument } from 'src/reports';
import { TableColumnProperties } from 'exceljs';
import { BadRequestException } from '@nestjs/common';
import { CatalogEnum, searchOption } from '@munyaal/cfdi-catalogs';
import { SchoolIncomeSummaryRow, SchoolInvoiceDetailsRow, SchoolInvoiceIncomeRow, SchoolInvoiceRow } from './types';
import { SchoolDetailInvoiceQuery, SchoolDetailsInvoiceQuery } from './query';
const esMx = require('moment/locale/es-mx');

export class SchoolInvoiceService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos facturados de colegio.
   * @param query - Consulta de ingresos facturados de colegio.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async getData(query: InvoiceQuery) {
    const invoices = await this.getInvoices(query);

    const paymentIDs = Array.from(
      new Set(
        invoices.filter((row) => !!row.id_pago).map((row) => row.id_pago),
      ),
    );

    const UUIDs = Array.from(
      new Set(
        invoices
          .filter((row) => row.global_factura === 'Factura global')
          .map((row) => row.uuid_factura),
      ),
    );

    const incomes = await this.getIncomes(paymentIDs, UUIDs);

    const rows = this.matchInvoicesToIncome(incomes, invoices);

    const summary = this.buildSummary(rows);

    return {
      rows,
      summary,
    };
  }

  /**
   * Genera un documento Excel con los datos de las facturas de colegio.
   * @param rows - Filas de ingresos facturados.
   * @param matriz - Matriz de resumen de ingresos facturados de colegio.
   * @returns Un documento Excel con los datos de ingresos.
   */
  public async buildDocument(
    rows: SchoolInvoiceDetailsRow[],
    summary: SchoolIncomeSummaryRow[],
  ) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Facturas');

    worksheet.columns = [
      { key: 'A', width: 10 },
      { key: 'B', width: 20 },
      { key: 'C', width: 22 },
      { key: 'D', width: 30 },
      { key: 'E', width: 20 },
      { key: 'F', width: 20 },
      { key: 'G', width: 20 },
      { key: 'H', width: 20 },
      { key: 'I', width: 20 },
    ];

    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:I${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Facturas colegio';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:I${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    subtitle.value = `Reporte emitido en ${moment()
      .locale('es')
      .format('lll')}`;
    subtitle.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    subtitle.font = { bold: true, size: 12 };
    lastRow += 2;

    const summaryColumns: TableColumnProperties[] = [
      { name: 'Metodo de pago', filterButton: false },
      { name: 'Total', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const summaryRows = summary.map((row) => [row.title, row.amount]);

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
      { name: 'Folio Factura', filterButton: false },
      { name: 'Fecha Factura', filterButton: false },
      { name: 'UUID Factura', filterButton: false },
      { name: 'Tipo Factura', filterButton: false },
      { name: 'RFC Cliente', filterButton: false },
      { name: 'Razon Social Cliente', filterButton: false },
      { name: 'Forma de Pago', filterButton: true },
      { name: 'Ingreso', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => [
      row.folio_factura,
      moment(row.fecha_factura).format('lll'),
      row.uuid_factura,
      row.global_factura,
      row.rfc_cliente,
      row.razon_social_cliente,
      row.nombre_metodo_pago,
      row.total_factura,
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
   * @param query - Consulta de ingresos facturados.
   * @returns Una lista de detalles de ingresos.
   */
  private async getInvoices(args: InvoiceQuery): Promise<SchoolInvoiceRow[]> {
    let { startDate, endDate } = args;

    const params: any[] = [
      `${args?.invoiceStatus}`,
      startOfDay(`${startDate}T12:00:00`).toISOString(),
      endOfDay(`${endDate}T12:00:00`).toISOString(),
    ];

    const rows: SchoolInvoiceRow[] = await this.connection.query(
      SchoolDetailInvoiceQuery,
      params,
    );

    return rows.map((row) => ({
      ...row,
      id_factura: parseInt(`${row.id_factura}`),
      id_pago: parseInt(`${row.id_pago}`),
      total_factura: parseFloat(`${row.total_factura}`),
      global_factura:
        `${row.global_factura}` == '0'
          ? 'Factura global'
          : 'Factura individual',
    }));
  }

  /**
   * Obtiene los detalles de ingresos de facturas basados en los IDs de pagos y UUIDs proporcionados.
   *
   * @param {number[]} paymentIDs - Un array de IDs de pagos.
   * @param {string[]} UUIDs - Un array de UUIDs.
   * @returns {Promise<InvoiceIncomeRow[]>} - Una promesa que resuelve a un array de detalles de ingresos de facturas.
   *
   * @throws {Error} - Lanza un error si ocurre algún problema durante la consulta a la base de datos.
   */
  private async getIncomes(
    paymentIDs: number[],
    UUIDs: string[],
  ): Promise<SchoolInvoiceIncomeRow[]> {
    if (paymentIDs.length === 0) paymentIDs.push(0);
    if (UUIDs.length === 0) UUIDs.push('');

    const paymentIDsParams = paymentIDs.map(() => '?').join(',');
    const UUIDsParams = UUIDs.map(() => '?').join(',');

    const query = SchoolDetailsInvoiceQuery
      .replace('@paymentIDs', paymentIDsParams)
      .replace('@UUIDs', UUIDsParams);

    const rows = await this.connection.query(query, [...paymentIDs, ...UUIDs]);

    return rows.map((row) => ({
      ...row,
      id_venta: parseInt(`${row.id_venta}`),
      id_pago: parseInt(`${row.id_pago}`),
      id_metodo_pago: parseInt(`${row.id_metodo_pago}`),
      cobrado: parseFloat(`${row.cobrado}`),
    }));
  }

  private matchInvoicesToIncome(
    incomes: SchoolInvoiceIncomeRow[],
    invoices: SchoolInvoiceRow[],
  ): SchoolInvoiceDetailsRow[] {
    return invoices.map((invoice) => {
      const invoiceIncomes = incomes.filter(
        (income) =>
          income.id_pago === invoice.id_pago ||
          income.uuid_factura === invoice.uuid_factura,
      );

      const method = this.getFiscalMethodPayment(invoiceIncomes);

      const option = searchOption(method.code, CatalogEnum.FormaPago);

      return {
        ...invoice,
        nombre_metodo_pago: option?.description || 'No especificado',
        codigo_metodo_pago: option?.key || 'No especificado',
      };
    });
  }

  /**
   * Obtiene el método de pago más alto fiscal basado en los ingresos proporcionados.
   *
   * @param {InvoiceIncomeRow[]} incomes - Arreglo de objetos que representan los ingresos de las facturas.
   * @returns {{ code: string; value: number }} - El método de pago con el valor más alto.
   * @throws {BadRequestException} - Si no existen métodos de pago en los ingresos proporcionados.
   */
  private getFiscalMethodPayment(incomes: SchoolInvoiceIncomeRow[]) {
    const groupMethods = incomes.reduce((acc, current) => {
      if (!acc[`${current.codigo_metodo_pago}`]) {
        acc[`${current.codigo_metodo_pago}`] = current.cobrado;
      } else {
        acc[`${current.codigo_metodo_pago}`] += current.cobrado;
      }

      return acc;
    }, Object.assign({}));

    const methods: { code: string; value: number }[] = [];

    for (const key in groupMethods) {
      const value = groupMethods[key];
      if (!!value) {
        methods.push({
          code: key,
          value: value,
        });
      }
    }

    if (methods.length === 0) {
      throw new BadRequestException('No existen métodos de pago');
    }

    methods.sort((a, b) => b.value - a.value);

    const [method] = methods;

    return method;
  }

  /**
   * Construye un resumen de ingresos a partir de una lista de detalles de facturas.
   *
   * @param {InvoiceDetailsRow[]} rows - Lista de filas de detalles de facturas.
   * @returns {IncomeSummaryRow[]} Resumen de ingresos agrupado por método de pago.
   *
   * @remarks
   * Este método agrupa las filas de detalles de facturas por el código del método de pago
   * y calcula el total de la factura para cada grupo. Luego, busca la descripción del método
   * de pago en el catálogo y construye un resumen con el id, título y monto de cada grupo.
   */
  private buildSummary(rows: SchoolInvoiceDetailsRow[]) {
    const grouped = rows.reduce((acc, current) => {
      if (!acc[`${current.codigo_metodo_pago}`]) {
        acc[`${current.codigo_metodo_pago}`] = current.total_factura;
      } else {
        acc[`${current.codigo_metodo_pago}`] += current.total_factura;
      }

      return acc;
    }, Object.assign({}));

    const summary: SchoolIncomeSummaryRow[] = [];

    for (const key in grouped) {
      if (grouped.hasOwnProperty(key)) {
        const element = grouped[key];

        const wayPayment = searchOption(key, CatalogEnum.FormaPago);

        summary.push({
          id: parseInt(key),
          title: wayPayment.description,
          amount: element,
        });
      }
    }

    return summary;
  }
}
